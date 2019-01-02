import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import OrderConfirm from './../views/OrderConfirm.vue'
import OrderSuccess from './../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})


/*

router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象。。。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。。。

this.$router.push会往history栈中添加一个新的记录。。详细见vue官方文档https://router.vuejs.org/zh/guide/essentials/navigation.html

route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等。。

打印this.$route和this.$router。

路由传参的方式

1.可以手写完整的path：

this.$router.push({path:`/user/${userId}`})

这样传递参数的话，配置路由的时候需要在path上加参数path：user/：userId。

这种接收参数的方式是this.$route.params.userId。

2.也可以用params传递：

3.也可以用query传递：


query传参是针对path的，params传参是针对name的。。接收参数的方式都差不多。。this.$route.query.和this.$route.params.

注意这只是跳转url，跳转到这个url显示什么组件，得配置路由。router跳转和<router-link>标签跳转，规则差不多。

展示上的话：


注意：如果提供了path，params将会被忽略，但是query不属于这种情况。。。

如果使用完整路径和query传参，刷新页面时不会造成路由传参的参数丢失。

这个vue官方文档讲的很详细。

二、

有时候配置路由时path有时候会加 '/' 有时候不加,例如path:'name'和path:'/name'。区别其实官方文档说了，我当时没仔细看，导致这个问题还困扰了我很久。

意思就是以 / 开头的会被当做路径，就不会一直嵌套之前的路径。

*/