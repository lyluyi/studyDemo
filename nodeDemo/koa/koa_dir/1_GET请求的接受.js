const Koa = require('koa')
const app = new Koa()

/*
  query和querystring区别

  在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。

  query：返回的是格式化好的参数对象。
  querystring：返回的是请求字符串。

*/ 

//  在ctx.request中获取Get请求外
app.use(async(ctx) => {
  let url =ctx.url
  let request =ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] server is Starting at port 3000')
})

