// function foo () {
//   var a = 10;

//   function bar() {
//     a *= 2;
//   }

//   bar();
//   return console.log(a)
// }

// foo()  // 20


//******************** */
// var baz 

// console.log(baz)

// function foo () {
//   var a = 10
//   console.log(a + '***********foo')
//   function bar () {
//     console.log(a + 'aaaaaaaaaaaa')
//     a *= 2
//     return console.log(a + '**************bar')
//   }
//   return bar
// }

// // console.log(foo() === foo())

// foo()()
// foo()()
// foo()()
// foo()()
// console.log(foo.prototype)
//  baz = foo()
// baz() // 20
// baz() // 40
// baz() // 80

/*
foo()()
foo()()
foo()()
foo()()

foo()() 每次调用时，都会在堆内存中为bar开辟一个内存空间

但是 baz = foo() 后 相当于 栈内存中有一个baz的变量 指向了 堆内存 foo() rerurn出来的bar

只要baz这个变量没有被销毁，那么这个指向就不会断开，因此，baz方法内的变量a的值 也不存在销毁


*/

// var blat = foo()
// blat() // 20
// blat()
/*
  函数是运行在定义它们的作用域中，而不是运行在调用它们的作用域中！！！
  只要bar定义在foo中 那么bar就可以访问foo中定义的所有变量，即使foo的执行已经结束

  这就是一个闭包的例子，在foo返回后，它的作用域被保存下来，但只有它返回的那个函数能够
  访问这个作用域。在前面的示例中，baz和blat各有这个作用域及a的一个副本，而且只有它们
  自己能对其进行修改。返回一个内嵌函数式创建闭包最常用手段
*/ 

/*******************************/ 

/*
  用闭包实现私用成员

  var Book = function (newIsbn, newTitle, newAuthor) {

    // 私有属性
    var isbn, title, author;

    // 私有方法
    function checkIsbn () {
      
    }

    // 特权方法 权方法是指有权访问内部私有属性和私有方法的公有方法，而私有方法是指外部不可见且不可访问的方法。
    this.getIsbn = function () {
      return isbn
    }

    this.setIsbn = function (newIsbn) {
      if (!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN')
      isbn = newIsbn
    }
    
    this.getTitle = function () {
      return title
    }

    this.setTitle = function () {
      title = newTitle || 'No title specified'
    }

    this.getAuthor = function () {
      return author
    }

    this.setAuthor = function (newAuthor) {
      author = newAuthor || 'No author specified'
    }

    // 构造 代码
    this.setIsbn(newIsbn)
    this.setTitle(newTitle)
    this.setAuthor(newAuthor)

    // 公共 没有特权的方法
    Book.prototype = {
      display: function () {

      }
    }
  }

*/ 

  

  /************************/ 
  /*
    静态方法和属性
  

  */

  var Book = (function () {

    // 私有静态属性
  var numOfBooks = 0;

  // 私有静态方法
  function checkIsbn (isbn) {
    
  }

  // Return 构造器

  return function (newIsbn, newTitle, newAuthor) {
    
    // 私有属性
    var isbn, title, author;

    // 特权方法 权方法是指有权访问内部私有属性和私有方法的公有方法，而私有方法是指外部不可见且不可访问的方法。
    this.getIsbn = function () {
      return isbn
    }

    this.setIsbn = function (newIsbn) {
      if (!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN')
      isbn = newIsbn
    }
    
    this.getTitle = function () {
      return title
    }

    this.setTitle = function () {
      title = newTitle || 'No title specified'
    }

    this.getAuthor = function () {
      return author
    }

    this.setAuthor = function (newAuthor) {
      author = newAuthor || 'No author specified'
    }

    // 构造器 代码
    numOfBooks++; // 记录已经实例化了多少本书 用私有静态的方法

    if (numOfBooks > 50) {
      throw new Error('limit 50')
    }
    this.setIsbn(newIsbn)
    this.setTitle(newTitle)
    this.setAuthor(newAuthor)
  }
})()

  Book.convertToTitleCase = function (inputString) {

  }

  // 公共 没有特权的方法
  Book.prototype = {
    display: function () {

    }
  }