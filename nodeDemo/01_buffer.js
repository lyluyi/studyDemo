// Node的buffer 是一个二进制数据容器 数据接口类似数组 专门用于Node中的数据存放  十六进制的形式

//  主要 用于深入网络传输 文件操作  图片处理 等领域  与二进制数据操作相关

// var buffer =  new Buffer(10)

// console.log(buffer)  // 不推荐使用 可能会混入脏数据

// 字符串转二进制
var  str = 'Cranman_luyi'

var  buffer = Buffer.from(str)

console.log(buffer)  //  字符串转二进制

console.log(buffer.length)

console.log(str.length)   //  字符串 和二进制的长度是一致的

console.log(buffer.toString())  //  反过来 转回字符串

var  str1 = '哈啊哦'

var  buffer1 = Buffer.from(str1)

console.log(buffer1)  //  字符串转二进制

console.log(buffer1.length)  //  汉字进行二进制编码占三个字符串的长度

console.log(str1.length)   //  字符串 和二进制的长度是一致的

/*
00 ---ff
0 - 255
0或者1 代表1位 （bit）
8bit = 1B
1KB = 1024B
1MKB = 1024KB
*/




