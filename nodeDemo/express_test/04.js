var express = require('express')
var app = express()

// 指定视图所在的位置
app.set('views', './view')
// 注册模板引擎
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {"list": ['luyi', '18', 'music']})
})

app.listen(3000)