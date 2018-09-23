//  node  的全局对象 global 相当于window

// console.log(window.exports) // undefined
// console.log(global.exports) // undefined
// console.log(global.exports) // undefined

// console.log(arguments) // 函数特有的参数对象

//  每一个node模块（文件）都是在一个闭包内（最外层套了一层函数）定义，方便暴露，调用，避免全局污染。

// console.log(arguments.callee) // 指向当前函数对象