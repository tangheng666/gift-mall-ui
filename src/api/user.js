import request from '@/utils/request'
import qs from 'qs'

export function loginByUsername(mobile, password) {
  const data = qs.stringify({
    mobile,
    password
  })
  return request({
    url: '/user/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function registerByUsername(mobile, password, code, qq, wechat) {
  const data = qs.stringify({
    mobile,
    password,
    code,
    qq,
    wechat
  })

  return request({
    url: '/user/register',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  const data = qs.stringify({
    token
  })
  return request({
    url: '/user/loginDetail',
    method: 'post',
    data
  })
}


export function updateInfo(qq, wechat, token) {
  const data = qs.stringify({
    qq,
    wechat,
    token
  })
  return request({
    url: '/user/updateUsrInfo',
    method: 'post',
    data
  })
}
