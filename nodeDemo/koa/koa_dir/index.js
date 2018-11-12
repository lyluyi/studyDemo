const Koa = require('koa')
const app = new Koa()

app.use( async (ctx) => {
  ctx.body = 'hello koa2'
})



app.listen(3000)

// function getSomething () {
//   return 'something'
// }

// async function testAsync() {
//   return 'Hello asynv'
// }

// // const result = testAsync()
// // console.log(result)

// async function test () {
//   const v1 = await getSomething()
//   const v2 = await testAsync()
//   console.log(v1, v2)
// }

// test()

// function takeLongTime () {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('long_time_value', 1000)
//     })
//   })
// }

// async function test() {
//   const v = await takeLongTime()
//   console.log(v)
// }

// test()