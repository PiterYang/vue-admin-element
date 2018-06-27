import request from '@/utils/request'

export  function getRoleList(params) {
  const data = {...params}
  return request({
    url: '/role/getRoleList',
    method: 'post',
    data
  })
}

export function roleEdit(params) {
  const data = {...params}
  return request({
    url: '/role/roleEdit',
    method: 'post',
    data
  })
}

export function roleAdd(params) {
  const data = {...params}
  return request({
    url: '/role/roleAdd',
    method: 'post',
    data
  })
}
