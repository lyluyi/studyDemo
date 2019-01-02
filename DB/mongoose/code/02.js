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

// 4. 插入文档  插入的文档规范 必须按照Schema中的定义来
personModel.create({ // 插入一个文档
  name: '谢霆锋',
  age: '40',
  chat: 'HAHAHAHAH'
}, (err) => { // 异步 回调
  if (!err) {
    console.log('插入成功！')
  } else {
    throw err
  }
})

personModel.create({
  name: '王菲',
  age: '48',
  chat: 'WAXTF',
  sex: '女'
}, (err) => {
  if (!err) {
    console.log('插入成功！')
  } else {
    throw err
  }
})