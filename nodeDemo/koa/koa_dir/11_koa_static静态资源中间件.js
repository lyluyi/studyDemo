/*
  在后台开发中不仅有需要代码处理的业务逻辑请求，也会有很多的静态资源请求。
  比如请求js，css，jpg，png这些静态资源请求。也非常的多，有些时候还会访问静态资源路径。
  用koa2自己些这些静态资源访问是完全可以的，但是代码会雍长一些。
  所以这节课我们利用koa-static中间件来实现静态资源的访问。
*/

const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './static'

app.use(static(
  path.join(__dirname, staticPath)
))

app.use( async(ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('start static 3000')
})