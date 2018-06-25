// exports.str = '111'

// exports.fn = function () {
//     console.log('2222')
// }

// exports.obj ={
//     name: 'aaa',
//     age: '222'
// }

// exports = {
//     str: 'zhangsan',
//     fn: function() {
//         console.log('aaa')
//     },
//     obj: {
//         name: 'aa11',
//         age: 23
//     }
// }              // 会报空对象

module.exports = {
    str: 'zhangsan',
    fn: function() {
        console.log('aaa')
    },
    obj: {
        name: 'aa11',
        age: 23
    }
}       // 需要使用module.exports 值类型和引用类型的区别  栈区（简单数据类型都在栈区）和堆区（数组，对象等复杂对象）