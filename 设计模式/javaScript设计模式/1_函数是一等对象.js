// 匿名函数
// (function () {
//   var foo = 10
//   var bar = 2
//   console.log(foo* bar)
// })();

// // 匿名函数传参
// (function (foo, bar) {
//   console.log(foo * bar)
// })(10, 2);

// // 闭包
// var baz = (function (foo, bar) {
//   return foo * bar
// })(10, 2);

// 创建类的私有变量
var baz;
(function () {
  var foo = 10;
  var bar = 2; 
  baz = function () {
    console.log(foo * bar)
    return foo * bar
  }
})();
baz()