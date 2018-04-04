import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config=>{
  if(store.getters.token) {
    config.headers['T-Token'] = getToken()
  }
  return config
}, error=>{
  console.log('request error',error.message)
  Promise.reject(error)
})

service.interceptors.response.use(response=>response, error=>{
  console.log('response err'+error.message)
  Message({
    type: 'error',
    message:error.message,
    duration: 3000
  })
  return Promise.reject(error)
})
export default service
