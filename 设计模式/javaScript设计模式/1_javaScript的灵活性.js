
// eg1 不同的方法实现：启动和停止一个动画

// 方法一
function startAnimation () {
  // ...
}

function stopAnimation () {
  // ...
}

// 方法二 Anim class
//  var Anim = function () {
  
// }

// Anim.prototype.start = function () {

// }

// Anim.prototype.stop = function () {

// }

// // 使用
//  var  myAnim = new Anim()

//  myAnim.start()
//  myAnim.stop()

// 或者

// var Anim = function () {

// }

// Anim.prototype = function() {
//   start: function () {
//   },
//   stop: function () {
//   }
// }

// 方法三 Function.prototype.method用于为类添加新方法，它有两个参数，第一个是字符串，表示方法名，
// 第二个是用作新方法的函数
// Function.prototype.method = function (name, fn) {
//   this.prototype[name] = fn
// }
// var Anim = function () {

// }
// Anim.method('start', function () {

// })
// Anim.method('stop', function () {

// })

// 如果想使用链式调用的技术 return 出 this即可
// Function.prototype.method = function (name, fn) {
//   this.prototypep[name] = fn
//   return this
// };

// var Anim = function () {

// };
// Anim.method('start', function () {

// }).method('stop', function () {
  
// })

// var num = 1
// var bool = !!num
// console.log(bool)
