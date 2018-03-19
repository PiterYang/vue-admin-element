import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
console.log(process.env.BASE_API)
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config=>{
  if(store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error=>{
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(response=>response, error=>{
  console.log('err'+error)
  Message({
    type: 'error',
    message:error.message,
    duration: 3000
  })
  return Promise.reject(error)
})
export default service
