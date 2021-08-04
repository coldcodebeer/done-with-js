// flatten array
const flattenArray = (values) => values.reduce(
  (acc, current, index, array) => acc.concat(
    Array.isArray(current) ? flattenArray(current) : current
  ), []
)

// Check if Object is Empty in JavaScript
// https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/
const isAEmptyObjV1 = () => {
  return value && Object.keys(empty).length === 0 && empty.constructor === Object
}
// for older browsers
const isAEmptyObjV0 = () => {
  return (
    Object.prototype.toString.call(value) === '[object Object]' &&
    JSON.stringify(value) === '{}'
  )
}
const isAEmptyObjV0 = (value) => {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        return false
      }
    }

    return true
  }

  return false
}