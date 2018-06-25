import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 4.注入，所有的子组件都能够通过this.$store拿到此对象
  components: { App },
  template: '<App/>'
})