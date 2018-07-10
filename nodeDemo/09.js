//  值类型

// var num1 = 30
// var num2 = num1
// num1 += 10
// console.log(num1) // 40
// console.log(num2) // 30

//  引用类型

// var obj1 = {}  //对象是属于引用类型数据 会在堆内存中存在
// var obj2 = obj1
// obj2.name = "zhangsan"
// console.log(obj1.name)
// console.log(obj2.name)
// // obj1 创建一个对象 开辟了堆内存中一个地址 obj1赋值给obj2实际是指向obj2指向obj1的内存引用
// // obj2创建name的属性 在指向的内存中 因此obj1也有了相应的属性可以访问

// var md = new Object()
// md.exp = new Object({name: '111'})
// // var exp = md.exp  // 相当于 exprots 与 module.exports之间的关系。
// var exp = md.exp  // 存在着堆区 指针的一个概念 exp 指向 md.exp的内存引用
// // exp.name = '222' // 

// exp = {name: '333'} // 改变了 指针指向 指向了一个新的对象内存

// console.log(exp.name)  // 
// console.log(md.exp.name)

/* 而在node的闭包域内 exports === module.exports 的 
所以不允许 exports = {} 这种改变引用内存的操作 只能通过exports.属性 的方法暴露
*/

//  Buffer.alloc(size[, fill[, encoding]])

var  buffer = Buffer.alloc(10)
buffer[0] = 10
console.log(buffer)
