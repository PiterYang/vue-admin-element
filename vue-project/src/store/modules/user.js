import {loginByUsername,getUserInfo} from '@/api/login'
import {setToken,getToken,removeToken} from '@/utils/auth'
import axios from 'axios'
const user = {
  state: {
    'token': getToken(),
    'roles': [],

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
        /*axios.post('http://localhost:3000/login/login', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });*/
      })
    },
    getUserInfo({commit, state}) {
      return new Promise((resolve, reject)=>{
        getUserInfo(state.token).then((res)=>{
          if(res.data.status == 1) {
            console.log('store res',res)
            commit('SET_ROLES',res.data.roles)
          }
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    FedLogOut({commit, state}) {
      return new Promise((resolve,reject)=>{
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
