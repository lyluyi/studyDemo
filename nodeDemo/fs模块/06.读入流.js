var  fs = require('fs')

var rs = fs.createReadStream("D:/Program Files (x86)/网易云音乐PC版/cloudmusic.exe")   // 先read

var ws = fs.createWriteStream('cloudmusic.exe')  // 再write

// 2 打开读入通道  once 监听事件
ws.once('open',function(){
    console.log('读入通道已经打开')
})

ws.once('close',function(){
    console.log('读入通道已经关闭')
})

// 3 打开写入通道  once 监听事件
ws.once('open',function(){
    console.log('写入通道已经打开')
})

ws.once('close',function(){
    console.log('写入通道已经关闭')
})

// 4 绑定data
rs.on('data',function(data){
    console.log(data)
    ws.write(data)  // 写入数据
})

