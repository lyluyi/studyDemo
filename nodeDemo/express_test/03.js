var express = require('express')
var app = express()

app.get('/', (req, res) => {
  // res.send('hello wordl')
  // res.send({ name: 'luyi', age: 18 })
  // res.send("<input type='date'>") 
  // res.status(404).send('Bad Request') // send 只能响应一次请求
  
  res.write('it666')
  res.write('it666111')
  res.end('aaaaa') // 使用write时 一定要end

  /*
  如果服务器端没有数据返回到客户端 那么就可以用 res.end
  但是 如果 服务器端有数据返回到客户端 这个时候必须用res.send ,不能用 res.end（会报错）
  */

})

app.get('/:name/:age', (req, res) => {
  var name = req.params.name
  // var name = req.params['name']
  var age = req.params.age
  res.write(age)
  res.end(name)
})

app.listen(3000)