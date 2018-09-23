// 父类

// class People {
//   constructor (name, age) {
//     this.name = name
//     this.age = age
//   }
//   eat () {
//     alert(`${this.name} eat something`)
//   }
//   speak () {
//     alert(`name is ${this.name}, age : ${this.age}`)
//   }
// }

// class Student extends People {
//   constructor (name, age, number) {
//     super(name, age)
//     this.number = number
//   }
//   study () {
//     alert (`${this.name} study`)
//   }
// }

//***********************************************************

// 多态
// class People {
//   constructor (name) {
//     this.name = name
//   }
//   saySomething () {
//   }
// }

// class A extends People {
//   constructor (name) {
//     super(name)
//   }
//   saySomething () { // 实现了 对父类的方法继承 并重写 
//     alert ('AAAA')
//   }
// }

// ********************

//Jquery 分析
// class jQuery {
//   constructor(seletor) {
//     // 获取Array的slice方法
//     let slice = Array.prototype.slice
//     // 转为数组 并call了slice的方法
//     let dom = slice.call(document.querySelectorAll(seletor))
//     // 获取长度
//     let len = dom ? dom.length : 0
//     // 将每个元素 挂载到this上
//     for (let i = 0; i < len; i++) {
//       this[i] = dom[i]
//     }
//     this.length = len
//     this.seletor = seletor || ''
//   }
//   append (node) {

//   }
//   addClass (name) {

//   }
//   html (data) {

//   }
// }

// window.$ = function (selector) {
//   return new jQuery(selector)
// }

// /*
//   //window.$ = function (selector) {
//       return new jQuery(selector)
//   //}
// */

//  // 执行window.$的方法 生成jQuery的实例
//  var $p = $('p')
//  console.log($p) // jQuery 通过类创建实例 
 
//  console.log($p.addClass) // ƒ addClass(name) {}

//******************************************
// UML类图
class People {
  constructor(name, house) {
    this.name = name
    this.house = house
  }
  saySomething () {

  }
}

class A extends People {
  constructor(name, house) {
    super(name, house)
  }
  saySomething () {
    alert('I am A')
  }
}

class B extends People {
  constructor(name, house) {
    super(name, house)
  }
  saySomething () {
    alert('I am B')
  }
}

class House {
  constructor(city) {
    this.city = city
  }
  showCity () {
    alert(`house in ${this.city}`)
  }
}

// 测试
let aHouse = new House('北京')
let a = new A('aaa', aHouse) // 将House 生成的实例对象挂载到 a 上  a是A的实例对象 A又继承于People
console.log(a)
let b = new B('bbb')
console.log(b)

