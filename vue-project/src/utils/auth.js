import Cookies from 'js-cookie'

const cookieKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(cookieKey)
}

export function setToken(token) {
  return Cookies.set(cookieKey, token)
}
