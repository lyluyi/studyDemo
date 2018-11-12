// let a=1
// console.log(a)

// console.log('js'.repeat(3))


  // let arr =Array.of(...[3,4,5,6]);
  // console.log(arr); // [3, 4, 5, 6]

  // arr.fill('js', 2, 3)   
  // console.log(arr)  // [0, 1, "js", "js", "js", 5, 6, 7, 8, 9]



  let arr = [0, 1, 2, 3]

  // for(let item of arr) {
  //   console.log(item)
  // }

  for (let [index, item] of arr.entries()) {
    console.log(index)
    console.log(item)
    console.log('\n')
  }
  
