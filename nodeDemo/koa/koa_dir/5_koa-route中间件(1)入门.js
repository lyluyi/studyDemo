const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 然后在构建应用的时候, 我们的首要目标就是创建多个 CGI 接口以适配不同的业务需求, 那么接下来就需要注册对应的路由:
router.get('/', function (ctx, next) {
  ctx.body = 'Hello 1111'
})

.get('todo', (ctx, next) => {
  ctx.body = 'Todo page'
})


/*
  allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头。

*/ 
app
  .use(router.routes()) // 添加路由中间件
  .use(router.allowedMethods())
  app.listen(3000, () => {
    console.log('====================================')
    console.log('starting at port 3000……')
    console.log('====================================')
  })