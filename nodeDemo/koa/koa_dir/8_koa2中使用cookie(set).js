/*
  开发中制作登录和保存用户信息在本地，最常用的就是cookie操作。\
  比如在作一个登录功能时，希望用户在接下来的一周内都不需要重新登录就可以访问资源，
  这时候就需要操作cookie来完成的需求。koa的上下文（ctx）直接提供了读取和写入的方法。

  ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
  ctx.cookies.set(name,value,[options])：在上下文中写入cookie。
  
*/

const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'MyName', 'JSPang'
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000, () => {
  console.log('start 3000')
})