var fs = require('fs')

fs.open('Cranman_luyi.txt','w',function(err,fd){
    //callback
    // err 状态判断
    if (!err) {
        // 2.2  写入文件
        fs.writeFile(fd,'aabbcc',function(err){
            // 2.2.1 写入成果
            if (!err) {
                console.log('写入文件成功')
            } else {
                throw err
            }
            fs.close(fd,function(err){
                if (!err) {
                    console.log('文件写入保存并关闭')
                }
            })
        })
    }
    else {
        throw err
    }
})
