var newArr = [1,1,3,4,4,6]
var id = 4
let newArrIndex = newArr.map((item, index) => {
  if (item === id) {
    return index
  } else{
    return false
  }
})

console.log(newArrIndex)

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1, arr2)
