import Cookies from 'js-cookie'

var TokenKey = 'Admin-Token'
var PswKey = 'Admin-Psw-Default'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPsw() {
  return Cookies.get(PswKey)
}

export function setPsw(Psw) {
  return Cookies.set(PswKey, Psw)
}