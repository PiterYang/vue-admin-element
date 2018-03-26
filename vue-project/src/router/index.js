import Vue from 'vue'
import Router from 'vue-router'
const _import_ = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const layout = _import_('layout/index')
export const publicRouter = [
  {
    path: '/login',
    name: 'login',
    component: _import_('login/index')
  },
  {
    path: '/404',
    name: '404',
    component: _import_('Error/404')
  },
  {
    path: '',
    name: 'workSpace',
    redirect: 'workSpace/index',
    component: layout,
    children: [
      {
        path: 'workSpace/index',
        component: _import_('workSpace/index'),
        meta: {
          title: 'workSpace'
        }
      }
    ]
  }
]

export default new Router({
  routes: publicRouter
})

export const differertRouter = [
  {
    path: '/roleManage',
    name: 'roleManage',
    component: layout,
    children: [
      {
        path: 'roleList',
        name: 'roleList',
        component: _import_('roleManage/roleList'),
        meta: {
          title: 'roleList'
        }
      },
      {
        path: 'roleEdit',
        name: 'roleEdit',
        component: _import_('roleManage/roleEdit'),
        meta: {
          title: 'roleEdit'
        }
      }
    ]
  },
  {
    path: '/productList',
    name: 'productList',
    component: layout,
    children: [
      {
        path: 'addProduct',
        name: 'addProduct',
        component: _import_('product/productList'),
        meta: {
          title: 'productList'
        }
      },
      {
        path: 'editProduct',
        name: 'editProduct',
        component: _import_('product/productEdit'),
        meta:{
          title: 'productEdit'
        }
      }
    ]
  }
]
