const Kao = require('koa')
const fs = require('fs')

const app = new Kao()

function render (page) {
  return new Promise((resolve, reject) => {
    let pageUrl = `./page/${page}`
    fs.readFile(pageUrl, 'binary', (err, data) => {  // 
      console.log(444)
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function route (url) { // 异步async
  let page = '404.html'

  switch (url) {
    case '/':
      page = 'index.html'
      break
    case '/index':
      page = 'index.html'
      break
    case '/todo':
      page = 'todo.html'
      break
    case '/404':
      page = '404.html'
      break
  }

  let html = await render(page) // await render 方法执行完毕 才执行

  return html
}

app.use(async(ctx) => {
  let url = ctx.request.url
  let html = await route(url) //  koa2 路由对象的异步 await 上文的同步代码执行完毕 才会执行

  ctx.body = html
})

app.listen(3000)