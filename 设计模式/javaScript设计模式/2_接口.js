/*
  接口： 面向对象设计的第一条原则就是：针对接口而不是实现 编程

  什么是接口：接口提供了一种用以说明一个对象应该具有哪些方法的手段。例如：如果一个几口包含有一个名为
  setName的方法，那么你有理由认为这个方法的实现因钙具有一个字符串参数，并且会把这个参数赋给一个name变量

  接口之利： 既定的一批接口具有自我描述性，并能促进代码的重用。接口可以告诉程序员一个类实现了哪些方法，从而帮助其
  使用这个类。如果你熟悉一个特定的接口，那么就已经知道如何使用任何实现了它的类，从而更有可能实现类的重用，并且测试和调试因此
  也能变得轻松简单
  
  接口之弊：接口并非没有缺点。Js是一种具有极强表现力的语言，这主要得益于其弱类型的特点。而接口的使用则在一定程度上强化了
  类型的作用。这降低了语言的灵活性。JS并没有提供对接口的内置支持，而试图模仿其它语言内置的功能总会有一些风险的。任何实现
  接口的方法都会对性能造成一定的影响。
*/

/*
  JS中模仿接口有三种方法：注释法，属性检查法和鸭式辨型法。
  没有哪种技术是完美的，但是三者结合使用基本上可以令人满意。
 */

 // 1. 用注释模仿接口是最简单的方法，但是也是效果最差的方法

/*
 // 通过添加注释 模仿接口 作为注解说明

interface Composite {
  function add(child);
  function remove(child);
  function getChid(child);
}

interface FormItem {
  function save();
}

var CompositeForm = function(id, method, action) {}

CompositeForm.prototype.add = function (child) {}
CompositeForm.prototype.remove = function (child) {}
CompositeForm.prototype.getChild = function (index) {}

CompositeForm.prototype.save = function () {}

// 这种模仿并不是很好，因为它没有确保CompositeForm真正实现了正确的方法集而进行检查
也不会抛出错误以告知程序员有问题。说到底它主要还是属于程序文档范畴，在这种做法中，对接口
约定的遵守完全 依靠自觉。

优点：它易于实现，不需要额外的类或者函数。它可以提高代码的可重用性，因为现在那些类实现的接口
都有说明，程序员可以把它们与其他实现了同样接口的类互换使用
*/


/*
  2、用属性检查模仿接口实现
  第二种方法要更严谨一点。所有类都明确声明自己实现了哪些接口，那些想与这些类打交道的对象可以针对这些声明进行检查。
  那些接口自身仍然只是注释，但现在你可以通过检查一个属性得治某个类自称实现了什么接口

*/ 

  /*

    优点：它对类所实现的接口提供了文档说明，如果需要的接口不在一个类宣称的支持的接口之列，你会看到错误信息。
    通过利用这些错误，你可以强怕其他程序员声明这些接口。

    这种方法的主要缺点在于它并未确保类真正实现了自称实现的接口，你只知道它是否说自己实现了接口。
    **************************
    在创建一个类时，声明它实现了一个接口，但后来在实现该接口所规定的方法时，却漏掉其中的某一个，这一种错误很常见
    ，此时所有检查都能通过，但那个方法却并不存在，这将在代码中埋下一个隐患。另外，显示声明所支持的接口也需要做一些
    额外的说明。
    **************************

    例子：CompositeForm宣称自己实现了Composite和FormItem这两个接口，其做法是把这两个接口的名称加入一个名为
    implementsInterFaces的数组。类显示声明自己支持什么接口。任何一个要求其参数属于特定类型的函数都可以对
    这个属性进行检测，并在所需接口未在声明之列时，抛出一个错误。
 

  interface Composite {
    function add(child);
    function remove(child);
    function getChild(index);
  }

  interface FormItem {
    function save()
  }

  var CompositeForm = function (id, method, action) {
    this.implementsInterfaces = ['Composite', 'FormItem']
  }

  function addForm (formInstance) {
    if (!implements(formInstance, 'Composite', 'FormItem')) {
      throw new Error('Object does not implement a require interface')
    }
  }

  function implements(object) {
    for (var i = 1; i < arguments.length; i++) { // 循环遍历所有参数
      var interfaceName = arguments[i] // 从第二个开始
      var interfaceFound = false
      for (var j = 0; j < Object.implementsInterfaces.length; j++) {
        if (object.implementsInterfaces[j] == interfaceName) {
          interfaceFound = true
          break
        }
      }
      if (!interfaceFound) {
        return false // 一个接口也没有被发现
      }
    }
    return true // 所有接口都被发现
  }

   */ 

  // 本书使用的Interface的类定义
  // Constructor
/*
  var Interface = function (name, methods) {
    if (arguments.length != 2) {
      throw new Error('Interface consturctor called with' + arguments.length + "arguments, but expected exactly")
    }

    this.name = name;
    this.methods = [];
    var len = methods.length;
    for (var i = 0; i < len; i++) {
      if (typeof methods[i] !== 'string') {
        throw new Error("Interface constructor expects method names to be passed in as a string")
      }
      this.methods.push(methods[i])
    }
  }

  // Static class method
  Interface.ensureTmplements = function(object) {
    if (arguments.length < 2) {
      throw new Error('Function Interface.ensureImplements called with' + 
      arguments.length + 'arguments, but expeced at least 2.')
    }

    var len = arguments.length;
    for (var i = 1; i < len; i++) {
      var interface = arguments[i]
      if (interface.constructor !== Interface) {
        throw new Error('Function Interface.ensureImplements expects arguments'
       + 'tow and above to be instances of Interface')
      }

      for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
        var method = interface.methods[j]
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error('Function Interface.ensureImplement: object '
          + 'does not implement the' + interface.name
          + 'interface. Method' + method + 'was not found')
        }
      }
    }
  }

 */

 /*
    eg1: 假设你要创建一个类，它可以将一些自动化测试结果转化为适于网页上查看的格式。该类的构造器数据
         以一个TestResult类的实例为参数。它会应客户的请求对这个TestResult对象所封装的数据进行格式
         化，然后输出。这个ResultFormatter类最初的实现如下：
 */

  var ResultFormatter = function (resultsObject) {
    if (!(resultsObject instanceof TestResult)) {
      throw new Error ('ResultsFormatter: constructor requires an instance' + 'of TestResult as an argument.')
    }
    this.resultsObject = resultsObject
  }

  ResultFormatter.prototype.renderResults = function () {
    var dateOfTest = this.resultsObject.getDate()
    var resultsArray = this.resultsObject.getResults()

    var resultsContainer = document.createElement('div')

    var resultsHeader = document.createElement('h3')
    resultsHeader.innerHTML = 'Test Results from' + dateOfTest.toUTCString()
    resultsContainer.appendChild(resultsList)

    var len = resultsArray.length
    for (var i = 0; i<len; i++) {
      var listItem = document.createElement('li')
      resultsList.appendChild(listItem)
    }

    return resultsContainer
  }





