// 在JavaScript中，一切都是对象（除了三种原始数据类型），即便是这三种类型，在需要的时候，也会自动包装为对象

// 为函数添加属性
function displayError(message) {
  displayError.numTimesExecuted++;
  console.log(message)
}
displayError.numTimesExecuted = 0;
displayError(1)

// 定义一个person类

function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype =  {
  getName: function() {
    return this.name;
  },
  getAge: function() {
    return this.age
  }
}

var a = new Person ('aaa', 18)
var b = new Person ('bbb', 28)
console.log(a.getAge())

Person.prototype.getGreeting = function () {
  return 'Hi' + this.getName() + '!'
}
console.log(a.getGreeting())

// 在这个例子中，
// 类的getGreeting的方法是在已经创建了类的两个实例之后才添加的，但是由于原型机制的问题，对象a仍然可以使用这个方法


