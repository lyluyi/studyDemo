var fs = require('fs')

// 1创建写入流
var ws = fs.createWriteStream('luyi_1.txt')

// console.log(ws)

// 2打开通道  once 监听事件
ws.once('open',function(){
    console.log('通道已经打开')
})

ws.once('close',function(){
    console.log('通道已经关闭')
})

// 3 写入内容
ws.write('1')
ws.write('2')
ws.write('3')
ws.write('4')
ws.write('5')

// 4 关闭通道
ws.end()

// fs.readFile('luyi_1.txt','utf8',function(err,data){
//     if (err) throw err;
//     console.log(data);
// })
// fs.open('luyi_1.txt', 'r', (err, fd) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         console.error('文件不存在');
//         return;
//       }
//       throw err;
//     }
//     console.log(fd + '**********')
//   });



