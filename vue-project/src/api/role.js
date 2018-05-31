import request from '@/utils/request'

export  function getRoleList(params) {
  const data = {...params}
  return request({
    url: '/role/getRoleList',
    method: 'post',
    data
  })
}
