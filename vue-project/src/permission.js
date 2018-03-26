import router from './router'
import {Message} from 'element-ui'
import store from './store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from './utils/auth'

function hasPermission(roles, permissionRoles) {
  if (roles == 'admin') {
    return true
  }
  if(!permissionRoles) {
    return true
  }
  return roles.some(role => permissionRoles.indexOf(role) > 0)
}

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if(to.path == '/login') {
      next({path: '/'})
    } else {
      if(store.getters.roles.length == 0) {
        store.dispatch('getUserInfo').then(res => {
          console.log(33333333)
          console.log(res)
          console.log(222222)
          const roles = res.data.roles
          store.dispatch('GenerateRoutes', {roles}).then(res => {
            console.log(store.getters)
            router.addRoutes(store.getters.addRouters)
            console.log(store.getters.permission_routers)
            console.log({...to})
            next({...to})
          })
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            console.log(err)
            Message.error('you have no permission please login again')
            next({path: '/login'})
          })
        })
      } else {
        if(hasPermission(store.getters.roles, to.meta.role)) {
          next()
        } else {
          next({path: '/401'})
        }
      }
    }
  } else {
    console.log(3333)
    next({path: '/login'})
  }
})
