// 1  引入模块
var fs = require('fs')

// 2 打开文件

// fs.openSync(path, flags[, mode])  同步  path  文件路径 flags string  状态操作 ‘w’ ‘r’

var fd = fs.openSync('luyi','w') 

console.log(fd)

// 3 写入内容  fs.writeFileSync(file, data[, options])

fs.writeFileSync(fd,'Cranman_luyi,哈哈哈')

// 保存并退出
fs.closeSync(fd)

