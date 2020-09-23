import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UsernameKey = 'USERNAME_KEY'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
