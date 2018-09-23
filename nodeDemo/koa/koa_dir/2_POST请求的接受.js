/*
  对于POST请求的处理，Koa2没有封装方便的获取参数的方法，
  需要通过解析上下文context中的原生node.js请求对象req来获取。

  获取Post请求的步骤：

  解析上下文ctx中的原生nodex.js对象req。
  将POST表单数据解析成query string-字符串.(例如:user=jspang&age=18)
  将字符串转换成JSON格式。
  ctx.request和ctx.req的区别

  ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
  ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。
  ctx.method 得到请求类型

  Koa2中提供了ctx.method属性，可以轻松的得到请求的类型，然后根据请求类型编写不同的相应方法，
  这在工作中非常常用。我们先来作个小例子，根据请求类型获得不同的页面内容。GET请求时得到表单填写页面，
  POST请求时，得到POST处理页面。

*/

const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {

  // 当请求是为GET请求时，显示表单让用户填写
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
  } else if (ctx.url === '/' && ctx.method === 'POST') {   // POST
    let pastData = await parsePostData(ctx)
    ctx.body = pastData
    // ctx.body = '接受到请求'
    // console.log(ctx.body)
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

app.listen(3000)

function parsePostData (ctx) {
  return new Promise((resolove, reject) => { // 异步处理数据状态
    try {
      let postData = ''
      ctx.req.on('data', (data) => { // node原生处理数据监听
          postData = postData + data
      })

      ctx.req.addListener('end', function () { // 数据接受完毕，进行回调
        let parseData = parseQueryStr(postData) // 以key-value形式输出
        resolove(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

function parseQueryStr (queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log(queryStrList) // [ 'username=1111', 'age=222', 'website=333']
  for (let [index, queryStr] of queryStrList.entries()) { // 包含键值对的遍历
    let itemList = queryStr.split('=')
    console.log(itemList) // ['username', '1111'] 
    queryData[itemList[0]] = decodeURIComponent(itemList[1])  // 针对 %3A%2F%2 特殊字符的解码
  }
  return queryData
}

//处理URL参数
