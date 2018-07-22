"use strict";
/*

typeScript 基本数据类型

boolean number srting array

tuple(元祖类型) enum(枚举类型) 任意类型 any

null undefined void类型 never类型

*/
// boolean 
// var flag: boolean = true
// flag = 123 // error  类型与定义不符
// flag = false // right 
/******************
 *
 *
 *
 *
 *
 * ********************/
// array ts中定义数组的方式两种
// var arr = [1, 2, 3, 4]  // es5
/*
  // 第一种
  var arr: number[] = [1,2,3]
  console.log(arr)

*/
// // 第二种定义数组的方式
//  var arr: Array<number> = [1, 2, 3]
//  console.log(arr)
/*************************************
 *
 *
 *
 *
 *
 * *******************************************/
// 元祖 tuple 
// /元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。可以定义一对值分别为 string和number类型的元组。
// var x: [string, number] = ['aaa', 111]
// x = [10, 'aaa']  // error  定义声明要对应
// console.log(x[0].substr(1)) // 再已知数据类型的情况下 可以使用其方法 right
// console.log(x[1].substr(1)) // error
/*

当访问一个越界的元素，会使用联合类型替代：

x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型

*/
/*********************************
 *
 *
 *
 *
 *
 *
 *
 * *******************************/
// 枚举 enum 枚举类型是对JavaScript标准数据类型的一个补充
// enum Color {Red, Green, Blue}
// let c: Color = Color.Green
// console.log(c)
/*
var Color;
(function (Color) {
  Color[Color["Red"] = 0] = "Red";
  Color[Color["Green"] = 1] = "Green";
  Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);
console.log(Color)

1
ts基本数据类型.js:54 {0: "Red", 1: "Green", 2: "Blue", Red: 0, Green: 1, Blue: 2}

双向映射  在没有指定编号时，默认从0开始，下一个编号总是在上一个编号上加1
*/
//  或者，全部都采用手动赋值：
// enum Color {Red = 1, Green = 2, Blue = 4}
// let c: Color = Color.Green;
// console.log(c)
// console.log(Color)
// enum Color {Red = 1, Green, Blue}
// let colorName: string = Color[2]
// console.log(colorName)
// console.log(Color)
/*********************
 *
 *
 *
 *
 *
 * *********************/
// Any  
/*
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
那么我们可以使用 any类型来标记这些变量

*/
// var anyType: any = 4
// anyType = '111aaa'
// console.log(anyType)
// anyType = true
// console.log(anyType + '111')
// let anyType: any = 4
// anyType.toFixed()
// 在对现有代码进行改写的时候，any类型是十分有用的，
// 它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，
// 就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，
// 即便它真的有这些方法：
// let obj: Object = 4  // 可以任意的赋值  但是无法使用相应的方法
// console.log(typeof obj)  // number
// obj.toFixed()  // Error: Property 'toFixed' doesn't exist on type 'Object'.
// 当你只知道一种数据的类型时,any类型也是有用的，比如，你有一个数组，它包含了不用的数据类型
// let list: any[] = [1, 'aaa', 'bbb']
// list[1] = 100
// console.log(list)
/******************
 *
 *
 *
 *
 * *******************/
// Void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
// function warnUser(): void {
//   alert('This is my warning message!')
// }
//声明一个void类型的变量没有什么太大的作用，因为你只能为它赋予undefined和null
// let unusable: void = undefined;
/* ***
  Null 和 Undefined
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
 * 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
 *
 * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。
 * 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。
 *  再次说明，稍后我们会介绍联合类型。
 *
 * 尽可能地使用--strictNullChecks，本手册里我们假设这个标记是关闭的。
 
 * ****/
//  let u: undefined = undefined
//  let n: null = null
/**
 *
 * Never
 *
 * never类型表示的是那些永不存在的值的类型。 例如，
 * never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
 * 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 *
 * never类型是任何类型的子类型，也可以赋值给任何类型；
 * 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
 *  即使 any也不可以赋值给never。
*/
// 返回never的函数存在无法到达的终点
// function error(message: string): never {
//   alert(message)
// }
// // 推断的返回值类型为never
// function fail () {
//   return error('Something failed')
// }
// fail()
// // 返回never的函数必须存在无法到达的终点
// function infinteLoop(): never {
//   while (true) {
//   }
// }
/**
 *
 * 类型断言
 *
 * 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
 *
 * 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
 * 它没有运行时的影响，只是在编译阶段起作用。
 * TypeScript会假设你，程序员，已经进行了必须的检查。
 *
 * **/
// // 类型断言有两种形式。 其一是“尖括号”语法：
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;
//  其二是as语法 当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
// let someValue: any = 'this is a string'
// let strLength: number = (someValue as string).length
