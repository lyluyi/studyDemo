// 初始化默认的测试用户数据 
const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')

const jsondb = require('./db.json')

// 初始化users属性 确保其为一个数组
jsondb.users || (jsondb.users = [])

//#region for循环的数据
// for (var i = 0; i < 33; i++) {
//   jsondb.users.push({
//     id: 10010 + i,
//     name: 'abc' + i,
//     phone: '134333555' + i,
//     email: '123@qq.com'
//   })
// }
//#endregion

// mock 数据
let data = Mock.mock({
  'users|33': [
    {
      'id|+1': 20000,
      'name': '@cname',
      'email': '@email',
      'phone': '@natural(132000000,133000000)',
      'address': '@county(true)',
      'zip': '@zip',
      'birthday': '@date(yyyy-mm-dd)'
    }
  ]
})

// jsondb.users.push(...data.users)

jsondb.users = data.users

// 把数据写入到db.json中


fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(jsondb),{
  encoding: 'utf8'
})

console.log('写入基本数据')
