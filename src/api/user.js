import request from '@/utils/request'

export function loginByUsername(userInfo) {
  return request({
    url: '/login',
    data: userInfo
  })
}

export function registerByUsername(userInfo) {
  return request({
    url: '/register',
    data: userInfo
  })
}

export function logout() {
  return request({
    url: '/login/logout'
  })
}

export function getUserInfo() {
  return request({
    url: '/loginDetail'
  })
}

export function updateInfo(userInfo) {
  return request({
    url: '/updateUsrInfo',
    data: userInfo
  })
}

export function updatePassword(param) {
  return request({
    url: '/updatePassword',
    data: param
  })
}
