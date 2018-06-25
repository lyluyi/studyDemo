import Vue from 'vue'
import Router from 'vue-router'
import parentProp from '@/components/parentProp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: parentProp
    }
  ]
})
