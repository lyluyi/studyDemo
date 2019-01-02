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
// personModel.create({ // 插入一个文档
//   name: '谢霆锋',
//   age: 40,
//   chat: 'HAHAHAHAH'
// }, (err) => { // 异步 回调
//   if (!err) {
//     console.log('插入成功！')
//   } else {
//     throw err
//   }
// })

// personModel.create({
//   name: '王菲',
//   age: 48,
//   chat: 'WAXTF',
//   sex: '女'
// }, (err) => {
//   if (!err) {
//     console.log('插入成功！')
//   } else {
//     throw err
//   }
// })

// // 4. 增删查改

// // 4.1 增加
// personModel.create([
//   { name: '胡可可', age: 18,  chat: '可可公主',  sex: '女'},
//   { name: '刘德华', age: 58,  chat: '华仔'},
//   { name: '那英', age: 50,  chat: '我是那英',  sex: '女'},
//   { name: '周杰伦', age: 38,  chat: 'JAY'}
// ], (err) => {
//   if (!err) {
//     console.log('插入成功')
//   } else {
//     throw err
//   }
// })

// 4.2 查
// personModel.find({}, (err, docs) => {
//   if (!err) {
//     console.log(docs)
//   }
// })

// personModel.find({name: '周杰伦'}, (err, docs) => {
//   if (!err) {
//     console.log(docs)
//   }
// })

// personModel.find({}, {name: 1, _id: 0}, (err, docs) => { // 于mongoDB中 shell命令一样操作
//   if (!err) {
//     console.log(docs)
//   }
// })

// personModel.find({}, 'name sex chat', (err, docs) => { // 另一种写法 查询相应字段
//   if (!err) {
//     console.log(docs)
//   }
// })

// personModel.find({}, 'name sex chat', {skip: 2, limit: 2} , (err, docs) => { // 这个查询里'name sex chat' 从第二条开始 限制2条数据
//   if (!err) {
//     console.log(docs)
//   }
// })

// 4.3 改和删
// personModel.update({name: '刘德华'}, {$set : {age: 20}}, (err) => {
//   if (!err) {
//     console.log('修改成功')
//   } else {
//     throw err
//   }
// })

// personModel.update({name: '刘德华'}, {$set : {age: 20}}, {multi: true}, (err) => { // 修改多条匹配
//   if (!err) {
//     console.log('修改成功')
//   } else {
//     throw err
//   }
// })

// 删除
/*
  Model.deleteMany()
  Model.deleteOne()
  Model.remove()

*/
// personModel.remove({name: '那英'}, (err) => {
//   if (!err) {
//     console.log('修改成功')
//   } else {
//     throw err
//   }
// })

// Model.count() 统计文档的个数

// personModel.count({}, (err, count) => {
//   if (!err) {
//     console.log(count)
//   }
// })

// 补充


