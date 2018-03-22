import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login/index.vue'
const _import_ = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: _import_('login/index')
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: _import_('layout/index')
    }
  ]
})
