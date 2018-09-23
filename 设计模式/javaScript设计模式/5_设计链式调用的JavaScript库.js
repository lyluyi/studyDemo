/*
 * @Author: ly 
 * @Date: 2018-09-21 09:10:54 
 * @Last Modified by: ly
 * @Last Modified time: 2018-09-21 09:18:26
 */

 /*
    前面对$函数的改造只提供了对几个最常用的实际函数进行链式调用的支持，但是你可以尽情对其扩充。
    设计一个JavaScript库需要深思熟虑，一个库不一定要有成百上千行代码，它的功能几乎决定了它的
    大小。借鉴各种JavaScipt库中包含的那些最常用的特性。以下列出几乎所有JavaScript库都有的特性

    1、添加和删除事件监听器；对事件对象进行规范化处理
    2、DOM 类名管理；样式管理；
    3、Ajax 对XMLHttpRequest进行规范化处理

    如果对这个私用的_$构造函数进行扩充，把这些东西包括进去，那么其伪码大致是下面这个样子。
 
 */

  Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn
    return this
  }

  (function () {
    function _$(els) {

    }

    /*
      Events

      * addEvent
      * getEvent
      
    */
   
    _$method('addEvent', function (type, fn) {
      
    }).method('getEvent', function (e) {

    }).

    /*
      DOM

      * addClass
      * removeClass
      * replaceClass
      * hasClass
      * getStyle
      * setStyle
    
    */

    method('addClass', function (className) {

    }).method('removeClass', function (className) {

    }).method('replaceClass', function (oldClass, newClass) {
      
    }).method('hasClass', function (className) {

    }).method('getStyle', function (prop) {

    }).method('setStyle', function (prop, val) {

    }).

    /*
    
      AJAX

    */ 

    method('load', function () {

    })


    window.$ = function () {
      return new _$(arguments)
    }

  })()