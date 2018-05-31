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
      next('/')
    } else {
      if(store.getters.roles.length == 0) {
        store.dispatch('getUserInfo').then(res => {
          if(res.data.status == 1) {
            const roles = res.data.roles
            store.dispatch('GenerateRoutes', {roles}).then(res => {
              router.addRoutes(store.getters.addRouters)
              next({...to})
            })
          } else if (res.data.status == 2) {
            store.dispatch('FedLogOut').then(() => {
              Message.error('login timeout please login again')
            })
            next('/login')
          }

        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('you have no permission please login again')
            next('/login')
          })
        })
      } else {
        if(hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({path: '/401'})
        }
      }
    }
  } else {
    next()
    next('/login')
  }
})
