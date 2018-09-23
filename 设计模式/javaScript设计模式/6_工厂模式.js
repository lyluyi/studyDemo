/*
  简单工厂模式的概念：假设你想开几个自行车商店，每个点都有几种型号的自行车出售。
  这可以用一个类表示：
*/ 

/*  BicycleShop  class  */ 

var BicycleShop = function () {}

BicycleShop.prototype = {
  sellBicycle: function (model) {
    var bicycle;

    switch (model) {
      case 'The Speedster':
        bicycle = new Speedster()
        break;
      case 'The Lowrider':
        bicycle = new Lowrider()
        break;
      case 'The Comfort Cruiser':
        default:
        bicycle = new ComfortCruiser()
    }

    Interface.ensuerImplements(bicycle, Bicycle)

    bicycle.assemble()
    bicycle.wash()

    return this
  }
}

/*
  sellBicycle 方法根据所需要的自行车型号用switch语句创建一个自行车的实力。
  各种型号的自行车实力可以互相使用，因为它们都实现了Bicycle接口

  注解： 接口在工厂模式中起着很重要的作用，如果不对对象进行某种类型检查以确保其
  实现了必需的方法，工厂模式带来的好处也就所剩无几了。在所有这些例子中，你可以
  创建一些对象并且对它们一视同仁，那是因为你可以确信它们都实现了同样一批方法
*/

/*   Bicycle 的接口    */

var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair'])

/*   Speedster class   */

var SpeedSter = function () {

}

SpeedSter.prototype = {
  assemble: function () {

  },
  wash: function () {

  },
  ride: function () {

  },
  repair: function () {

  }
}

/*
  要出售某种型号的自行车，只要调用sellBicycle方法即可
*/

var cailforniaCruisers = new BicycleShop()
var yourNewBike = cailforniaCruisers.sellBicycle('The Speedster')


