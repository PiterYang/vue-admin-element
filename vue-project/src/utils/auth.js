import Cookies from 'js-cookie'

const cookieKey = 'Editor-Token'

export function getToken() {
  return Cookies.get(cookieKey)
}

export function setToken(token) {
  return Cookies.set(cookieKey, token)
}

export function removeToken() {
  return Cookies.remove(cookieKey)
}
