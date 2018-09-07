var  fs = require('fs')

fs.readFile('luyi_1.txt','utf8',function(err,data){
    if (err) throw err;
    console.log(data);
})

fs.readFile('C:/Users/Administrator/Desktop/TIM图片20180411143835.png',function(err,data){
    // 转义字符 \ node默认无法识别 可转义'\\' 或者使用'/'
    // 2.1 判断 
    if (!err) {
        // 写入 图片文件
        fs.writeFile('img.png',data,function(err){
            if (!err) {
                console.log('写入成功！')
            } else{
                throw err
            }
        })
    } else {
        throw err
    }
})  