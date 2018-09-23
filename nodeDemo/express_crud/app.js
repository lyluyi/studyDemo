const express = require('express')
const path = require('path')
const art_express = require('express-art-template')

// 获取用户的服务
const userService = require('./service/userService')

const app = express() // 创建APP对象

app.engine('art', art_express);

// 用 expresss提供的静态目录的中间件
app.use(express.static(path.join(__dirname, 'public')))
// Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，
// 所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。

console.log(__dirname)  //  \sss\nodeDemo\express_crud

console.log(path.join(__dirname, 'public')) //  \sss\nodeDemo\express_crud\public

// 动态的请求
app.get('/user/list', (req, res) => {
  // res.send('acb')
  // res.end()

  // 第一个参数是模板名 第二个参数是给模板的数据 res.render 默认从views文件夹下面查找，
  // 如果有子目录，添加相对路径即可
  // res.render('users/userlist2.art', {
  //   title: '你好啊',
  //   users: userService.getUsers()
  // })

  // 实现分页获取数据
  const page = parseInt(req.query.page) || 1
  const size = parseInt(req.query.size) || 10
  const data = userService.getPageUsers(page, size)
  res.render('users/userlist2.art', data)
  
})

app.listen(59999, () => {
  console.log('http://127.0.0.1:59999')
})