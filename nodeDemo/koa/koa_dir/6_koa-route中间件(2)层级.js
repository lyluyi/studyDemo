/*
  http://127.0.0.1:3000/todo，现在我们希望在所有的路径前面都加上一个jspang层级，
  把路径变成http://127.0.0.1:3000/jspang/todo.这时候就可以使用层级来完成这个功能。
  路由在创建的时候是可以指定一个前缀的，这个前缀会被至于路由的最顶层，也就是说，这个路由的所有请求都是相对于这个前缀的。
*/

// 1、  设置前缀一般都是全局的，并不能实现路由的层级

// const router = new router({
//   prefix: '/jspang'
// })

// 2、  如果你想为单个页面设置层级，也是很简单的。只要在use时使用路径就可以了。

/*
  例如这种写法装载路由层级，这里的router相当于父级：router.use(‘/page’, page.routes(), page.allowedMethods())。
  通过这种写法的好处是并不是全局的，我们可以给不同的路由加层级。
  代码如下：我们声明了两个路由，第一个是home,第二个是page.然后通过use赋予不同的前层级。
*/ 

const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

let home = new Router()

home.get('/jspang', async(ctx) => {
  ctx.body = 'home JSpang'
}).get('/todo', async(ctx) => {
  ctx.body = 'home toDo'
})

let page = new Router()

page.get('/jspang', async(ctx) => {
  ctx.body = 'page jspang'
}).get('/todo', async(ctx) => {
  ctx.body = 'page todo'
})

// 装载所有子路由
let router = new Router()

// 指定层级
router.use('/home', home.routes(), home.allowedMethods()) // home/jspang home/todo  
router.use('/page', page.routes(), page.allowedMethods()) // page/jspang page/todo

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
