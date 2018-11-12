/*
 * @Author: ly 
 * @Date: 2018-09-24 09:28:25 
 * @Last Modified by: ly
 * @Last Modified time: 2018-09-24 11:39:13
 */


/*
  对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中。
*/  

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async(ctx) => {
  if (ctx.method === 'GET' && ctx.url === '/') {
    let html = `
      <h1>Koa2 request post demo</h1>
      <form method="POST"  action="/">
        <p>userName</p>
        <input name="userName" /> <br/>
        <p>age</p>
        <input name="age" /> <br/>
        <p>webSite</p>
        <input name='webSite' /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/'  && ctx.method === 'POST') {
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    ctx.body = '<h1>404</h1>'
  }
  
})

app.listen(3000)
