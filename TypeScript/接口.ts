/*
TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 
在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

*/
/*
function printLable (lableObj: { lable : string }) {
  console.log(lableObj.lable)
}

let myObj = { size : 10, lable : 'Size 10 Object'}

printLable(myObj) 

*/

/*
ts 接口形式重写以上 
*/


/*

LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。 需要注意的是，
我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。我们只会去关注值的外形。
 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以

*/
// interface LableValue {
//   lable: string
// }

// function printLable (lableObj: LableValue) {
//   console.log(lableObj.lable)
// }

// let myObj = { size : 10, lable : "size is 10"}

// printLable(myObj)

/*
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。 

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：

*/
// **********************

interface SquareConfig {
  color ?: string
  width ?: number
}

function createSquare (config : SquareConfig) : { color : string, area : number} {
  let newSquare = { color : "white", area : 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width
  }
  return newSquare
}

let mySquare = createSquare ({ color : 'black'})
console.log(mySquare)