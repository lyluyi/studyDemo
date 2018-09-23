/*
 * @Author: ly 
 * @Date: 2018-09-18 22:35:14 
 * @Last Modified by: ly
 * @Last Modified time: 2018-09-19 22:46:13
 * 
 * 对读取和操作用户数据的服务封装
 * 
 */

// 加载JSON 文件模块
const dbjson = require('../db.json')

// 获取所有的用户数据
exports.getUsers = function () {
  return dbjson.users
}

// 分页 page：当前页  size：一页多少条
exports.getPageUsers = function (page, size) { 

  // 错误参数的处理
  // page: 必须是数字 而且必须>0 size 也是
  if (typeof page !== 'number' || page <= 0) {  
    return {
      code: 0,
      msg: 'page参数的类型不符合条件'
    }
  }
  if (typeof size !== 'number' || size <= 0) {
    return {
      code: 0,
      msg: 'size参数的类型不符合条件'
    }
  }

  // 这种异常最合理的方式是将传入的page size参数进行整型转换，如果能够转化，那么测试即可，如果不能转换，那么给默认值1,10
  
  // const data = userService.getPageUsers(2, 10) 第二页 十条数据 11-20
  return {
    users: dbjson.users.slice((page - 1) * size, page * size),
    code: 1,
    msg: '获取成功！'
  }
}