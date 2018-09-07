var express = require('express')
var app = express()

// app.use(express.static('./public'))

app.use('/static', express.static('./public'))  // 指定路由可以访问所有的静态资源
app.use('/file', express.static('./file'))  // 指定路由可以访问所有的静态资源

app.get('/', (req, res) => { // 此时访问127.0.0.1:3000 默认路径是不能获取任何资源的  因为路由没有配置
  res.send('hello world!')
});

app.listen(3000)