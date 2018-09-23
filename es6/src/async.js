/*
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句
*/ 

async function f() {
  return 'hello world'
}

const a = f()

console.log(a)
// f().then( v => console.log(v))
