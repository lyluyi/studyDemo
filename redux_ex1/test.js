var arr = [1,2,34,55]
var brr = [4,5,66,55]
var crr = [...arr,33,34,55]
console.log(crr)

var Arr = {a: '1', b: '2', c: '3', d: '4'}

var Brr = {b: '3', d :'4'}

var Crr = {
  ...Arr,
  ...Brr
}

console.log(Crr)
