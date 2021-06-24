  
const API = `https://api.publicapis.org/entries`

let SUBMITING = false

const sendRequest = (index) => {
  console.log(`sendRequest_: ${index}`)
  return new Promise(async (resolve) => {
    await fetch(API)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        console.log(`response: ${index}`, myJson)
        resolve()
      }).catch(err => {
        console.error(`request_${index}_error=>`, err)
      })
  })
}

const fetchMultiReqs = async (num = 4) => {
  if (SUBMITING) return

  num > 10 ? num = 10 : null

  const multiReqs = Array(num).fill(sendRequest)
  try {
    console.log('-- sending batch --')
    SUBMITING = true
    await Promise.all(multiReqs.map((f, i) => f((i + 1))))
    SUBMITING = false
    console.log('all asyn code done', 'SUBMITING_', SUBMITING)
  } catch (err) {
    console.error('Concurrent_request_error=>', err)
  }
}



const sendRequestsTimerId = setInterval(() => {
  fetchMultiReqs(100)
}, 2000)
