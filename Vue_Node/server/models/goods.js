var mongoose = require('mongoose')
var Schema = mongoose.Schema

var pruductSchema = new Schema({
  "productId": { type: String },
  "productName": String,
  "salePrice": Number,
  "checked": String,
  "productNum": Number,
  "productImage": String
})

module.exports = mongoose.model('Good', pruductSchema) // goods 建表时 一定要是goods  加s  这样model容易在dataBase中识别

/*

  module.exports = mongoose.model('Good', pruductSchema, 'goodList') // 要么就是添加参数 进行映射


*/ 