// /*
//   错误示例 
// */ 

// const Koa = require('koa')
// const app = new Koa()

// const doSomeing = time => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('task done!')
//     }, time)
//   })
// }

// // 用来打印请求信息
// app.use((ctx, next) => {
//   console.log(ctx)
//   console.log(`${ctx.method}:::${ctx.url}`)
//   next()
// })

// app.use(async ctx => {
//   const result = await doSomeing(3000)
//   console.log(result)
//   ctx.body = result
// })

// app.listen(3000)



// const Koa = require('koa');
// const app = new Koa();

// function step1(){
//   console.log("准备饭菜");
// }
// function step2(){
//   console.log("准备餐具");
// }
// function step3(){
//   console.log("收拾桌子");
// }

// app.use(async(ctx,next)=>{
//   await step1(); //等待step1执行完毕
//   console.log("我要开始做饭了");
//   await next(); //等待所有的next执行完毕
//   console.log("一切都做完了");
// });

// app.use(async(ctx,next)=>{
//   await step2(); //等待step2执行完毕
//   console.log("我要开始吃饭了");
//   await next();
// });

// app.use(async(ctx)=>{
//   await step3(); //等待step3执行完毕
//   console.log("我要开始洗碗了");
// });

// app.listen(3000);


// require("babel-register");
const Koa = require('koa');
const app = new Koa();


// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('------1---------');
  await next();
  console.log('------2---------');

  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('------3--------');

  await next();
  console.log('------4---------');

  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(async (ctx, next) => {
  console.log('------5--------');

  await next();
  console.log('------6---------');

});

// response
app.use(async ctx => {
  console.log('------7---------');

  ctx.body = ctx.response.status;
});

/*
------1---------
------3--------
------5--------
------7---------
------6---------
------4---------
GET / - 2
------2---------

当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。
当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

从上到下执行，await next() 即相当于回调，当同步执行完时，开始await next()的
回调执行，由于是异步回调的原因，相当于最后回调的await next() 最先执行，最开始
回调的最后执行

*/ 
