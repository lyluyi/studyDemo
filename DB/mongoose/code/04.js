var mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/m_data', { useNewUrlParser: true }, (err, res) => {
//   if (!err) {
//     console.log(res)
//   }
// })

mongoose.connect('mongodb://localhost/m_data')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function() {
  console.log('数据库连接成功！')
})

// 2. 创建Schema模式对象
var Schema = mongoose.Schema

var personSchema = new Schema({ // 基于mongoose.Schema 的构造类
  name: String,
  age: Number,
  sex: {
    type: String,
    default: '男'
  },
  chat: String
})

// 3. 创建Model对象
var personModel = mongoose.model('person', personSchema) // 集合的名称“person” 默认单数转辅助

var person = new personModel({ // 以文档的形式 通过构造函数实现 基于原型的方法
  name: '宋小宝',
  age: 40,
  chat: 'aaaa'
})

person.save((err, product) => {
  if (!err) {
    console.log(product)
  }
})
