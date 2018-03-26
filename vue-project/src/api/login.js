import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  const data = {
    token
  }
  return request({
    url: 'getUserInfo',
    method: 'post',
    data
  })
}
