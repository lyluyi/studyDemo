let http = require('http')

// 创建服务器
let server = http.createServer((req, res) =>{
  // console.log(req)
  // console.log(req.url)
  res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"})
  res.write('hello world')
  res.write('<h1>11231232</h1>')
  res.end('Cranman')
})

// 监听

server.listen('8080', '127.0.0.1')