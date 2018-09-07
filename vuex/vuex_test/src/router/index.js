import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import shop from '../components/shop.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    }
  ]
})
