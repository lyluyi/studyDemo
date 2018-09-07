// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     Math.random() > 0.5 ? resolve('success') : reject('fail')
//   },1000)
// })

// console.log(p)

// p.then((result) => {
//   console.log(result)
// }, (err) => {
//   console.log(err)
// })

// 先输入 Promise {<pending>} 再输出 成功或者失败的状态

/*
Promise函数体的内部包裹着一个异步的请求或者操作或者函数；
然后我们可以在这个异步的操作完成的时候使用resolve函数将我们获得的结果传递出去，
或者使用reject函数将错误的消息传递出去。
*/

// let p = new Promise((resolve, reject) => {
//   let flag = Math.random() > 0.5 ? true : false
//   if (flag) {
//     console.log("使用resolve将promise状态从pending变为resolved")
//     resolve("success")
//   }
//   else {
//     console.log("使用reject将promise状态从pending变为rejected")
//     reject("fali")
//   }
// })

// p.then((result) =>{
//   console.log("接受resolved的结果")
//   console.log(result)
// }, (err) => {
//   console.log("捕获错误的状态")
//   console.log(err)
// })

/*
then方法可以接受两个函数作为参数，第一个函数是用来处理resolve的结果，
第二个是可选的，用来处理reject的结果。也就是说，我们在创建p这个Promise对象的时候，
通过函数resolve传递出去的结果可以被p的第一个then方法中的第一个函数捕获然后作为它的参数。
通过函数reject传递出去的结果可以被p的第一个then方法中的第二个函数捕获然后作为它的参数。
当然我们还可以在每一个then方法中创建新的Promise，然后将这个Promise对象返回，
之后我们就可以在后面的then方法中继续对这个对象进行操作。下面是一个简单的例子：

*/

let p1 = new Promise((resolve, reject) => {  // 只有在resolve（）执行的情况下 才会执行then（）的回调
  let flag = Math.random() > 0.5 ? true : false;
  // if(flag) {
  //     console.log('使用resolve将promise状态从pending变为resolved')
  //     resolve('success')
  // }
  // else {
  //     console.log('使用reject将promise状态从pending变为rejected')
  //     reject('fail')
  // }
  resolve("success")
})

//@2 使用then方法进行链式的调用
// p1.then(() => {
//   return Promise.resolve(1)
// }).then((result) => { // result = 1
//   console.log(result);
//   return Promise.resolve('hello')
// }).then((result) => { // result = 'hello'
//   console.log(result)
// })

//    1  hello 

//@3 在then方法内 可以再次使用异步的操作
// p1.then(() => {
//   console.log('**********')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(123)
//     }, 1000)
//   })
// }).then((result) => {
//   console.log(result)
// })

/*
使用resolve将promise状态从pending变为resolved

*/


/*********************************************/

function start() {
  return new Promise((resolve, reject) => {
    resolve('start');
  });
}

start()
  .then(data => {
    // promise start
    console.log('result of start: ', data);
    // return Promise.resolve(1); // p1
    return 1

    /*
      then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
    */ 

  })
  .then(data => {
    // promise p1
    console.log('result of p1: ', data);
    // return Promise.reject(2); // p2   此时会跳过p3 然后在catch中抛出异常
    return 2
  })
  .then(data => {
    // promise p2
    console.log('result of p2: ', data);
    // return Promise.resolve(3); // p3
    return 3
  })
  .catch(ex => {
    // promise p3
    console.log('ex: ', ex);
    // return Promise.resolve(4); // p4
    return 4
  })
  .then(data => {
    // promise p4
    console.log('result of p4: ', data);
  });

  /*
  result of start:  start
  result of p1:  1
  ex:  2
  result of p4:  4
  */
