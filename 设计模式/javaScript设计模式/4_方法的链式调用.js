/*
 * @Author: ly 
 * @Date: 2018-09-20 09:22:03 
 * @Last Modified by: ly
 * @Last Modified time: 2018-09-20 21:55:45
 */



// 获取一个ID值为example的元素的引用，然后为其指派一个事件监听器，
// 当元素被点击时，事件监听器会将其文本颜色设置为绿色,然后显示该元素

// $('example').addEvent('click', function () {
//   $(this).setStyle('color', 'green').show()
// })

// function $() {
//   var elements = []
//   var len = arguments.length
//   for (var i = 0; i < len; ++i) {
//     var element = arguments[i]
//     if (typeof element === 'string') {
//       element = document.getElementById(element)
//     }
//     if (arguments.length === 1) {
//       return element
//     }
//     elements.push(element)
//   }
//   return elements
// }

// 将这个函数改造为一个构造器

// (function () {
//   // 使用私有类
//   function _$(els) { // 构造函数
//     console.log(this)
//     console.log(els)
//     this.elements = []
//     var len  = els.length
//     for (var i = 0; i < len; i++) {
//       var element = els[i]
//       if (typeof element === 'string') {
//         element = document.getElementById(element)
//         console.log(element)
//       }
//       this.elements.push(element)
//       console.log(this.elements)
//     }
//   }

//   // 添加prototype方法
//   _$.prototype = {
//     each: function (fn) {
//       var len = this.elements.length
//       for (var i = 0; i < len; ++i) {
//         fn.call(this, this.elements[i])
//       }
//       return this
//     },
//     setStyle: function (props, val) {
//       this.each(function(el) {
//         el.style[props] = val
//       })
//       return this
//     },
//     show: function () {
//       var that = this
//       that.each(function (el) {
//         that.setStyle('display', 'block')
//       })
//       return this
//     },
//     addEvent: function (type, fn) {
//       var add = function (el) {
//         if (window.addEventListener) {
//           el.addEventListener(type, fn, false)
//         } else if (Window.attachEvent) {
//           el.attachEvent('on' + type, fn)
//         }
//       }
//       this.each(function (el) {
//         add(el)
//       })
//       return this
//     }
//     /*
//       该类的每一个方法的最后一行，都以return this 结束，这会将用以调用方法的对象传给调用链上的下一个方法
//       支持链式调用的接口带来的可能性是无穷的，现在你可以像这样编写代码

//       $(window).addEvent('load', function () {
//         $('test-1', 'test-2').show()
//         .setStyle('color', 'red')
//         .addEvent('click', function (e) {
//           $(this).setStyle('color', 'green')
//         })
//       })
//     */
//   }

//   window.$ = function () { // $('test-1, $test-2') 调用时，传入arguments对象 处理参数集合
//     return new _$(arguments)
//   }
// })()

// $(window).addEvent('load', function () {
//   $('test-1', 'test-2').show()
//   .setStyle('color', 'red')
//   .addEvent('click', function (e) {
//     $(this).setStyle('color', 'green')
//   })
// })

 
  (function () {
    function _$ (els) {
      this.elements = []
      var len = els.length
      for (var i = 0; i < len; i++ ) {
        var element = els[i]
        // 判断是否为string类型
        if (typeof element === 'string') {
          // 获取传入ID的DOM对象
          element = document.getElementById(element)
        }
        this.elements.push(element) // 生成elements的属性集合
      }
    }

    /*
      var o2 = newCO();
        使用new操作符来调用一个构造函数的时候，发生了四件事

        var obj = {}
        obj.__proto__  = CO.prototype
        CO.call(obj)
        return obj
    */
    _$.prototype = {
      each: function (fn) {
        var len = this.elements.length
        for (var i = 0; i < len; i++) {
          /*
            function add(c,d){
              return this.a + this.b + c + d;
            }

            var s = {a:1, b:2}
            console.log(add.call(s,3,4)); // 1+2+3+4 = 10
            console.log(add.apply(s,[5,6])); // 1+2+5+6 = 14 

            this(_$ 的prototype上 call function (el) 方法  列举的元素为 this.elements[i])
          */ 
          fn.call(this, this.elements[i])
        }
       
      },
      setStyle: function (prop, val) {
        this.each(function (el) {
          el.style[prop] = val
        })
        return this
      },
      show: function () {
        var that = this
        this.each(function (el) { // 这里要使用 _$的对象继续调用
          that.setStyle('display', 'block')
        })
        console.log('====================================');
        console.log(this);
        console.log('====================================');
        console.log('====================================');
        console.log(this.__proto__);
        console.log('====================================');
        return this
      },
      addEvent: function (type, fn) { // 添加事件
        var add = function (el) {
          if (window.addEventListener) { // 兼容  事件监听
            el.addEventListener(type, fn, false)
          } else if (window.attachEvent) { // 直接添加事情类型
            el.attachEvent('on' + type, fn)
          }
        }
        this.each(function (el) { // each 循环给el元素 添加事件类型
          add(el)
        })
        return this
      }
    }

    window.$ = function () {
      /*
        function CO(){
          this.p = “I’m in constructed object”;
          this.alertP = function(){
              alert(this.p);
          }
        }

        var o2 = newCO();
        使用new操作符来调用一个构造函数的时候，发生了四件事

        var obj = {}
        obj.__proto__  = CO.prototype
        CO.call(obj)
        return obj

        第一行，创建一个空对象obj

        第二行，将这个空对象的__proto__成员指向了构造函数对象的prototype成员对象，这是最关键的一步，具体细节将在下文描述。

        第三行,将构造函数的作用域赋给新对象，因此CA函数中的this指向新对象obj，然后再调用CO函数。
        于是我们就给obj对象赋值了一个成员变量p，这个成员变量的值是” I’min constructed object”。

        第四行，返回新对象obj。当构造函数里包含返回语句时情况比较特殊，这种情况会在下文中说到。


      */ 
      return new _$(arguments)
    }
  })()

  $(window).addEvent('load', function () {
    $('test-1', 'test-2').show()
    .setStyle('color', 'red')
    .addEvent('click', function (e) {
      $(this).setStyle('color', 'green')
    })
  })

  // console.log('====================================')
  // console.log($('test-1'));
  // console.log('====================================')
