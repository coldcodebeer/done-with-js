// free public apis
const APIS = [
  'https://api.publicapis.org/entries',
  'https://catfact.ninja/fact',
  'https://api.coindesk.com/v1/bpi/currentprice.json',
  'https://www.boredapi.com/api/activity',
  'https://api.agify.io?name=meelad',
  'https://api.genderize.io?name=luc',
  'https://api.nationalize.io?name=nathaniel',
  'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
  'https://dog.ceo/api/breeds/image/random',
  'https://api.ipify.org?format=json',
  'https://ipinfo.io/161.185.160.93/geo',
  'https://official-joke-api.appspot.com/random_joke',
  'https://randomuser.me/api/',
  'http://universities.hipolabs.com/search?country=United+States',
  'https://api.zippopotam.us/us/33162',
]

const sendRequest = (index) => {
  console.log(`sendRequest: ${index+1} batch`);
  return new Promise(async (resolve) => {
    await fetch(APIS[index])
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(`response: ${index}`, myJson);
        resolve()
      })
  })
}

// 5 batches * 3 requests = 15 requests.
const batches = Array(5).fill(Array(3).fill(sendRequest))

;(async function() {
  batches.forEach(async (item, index) => {
    try {
      console.log('-- sending batch --')
      await Promise.all(item.map(f => f(index)))  
    } catch(err) {
      console.error(err)
    }
  })

})()
