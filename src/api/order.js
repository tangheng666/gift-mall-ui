import request from '@/utils/request'

export function fetchOrder(data) {
  return request({
    url: '/fetchOrder',
    data
  })
}

export function createOrder(data) {
  return request({
    url: '/createOrder',
    data: data
  })
}

export function payOrder(data) {
  return request({
    url: '/payOrder',
    data
  })
}

export function cancelOrder(data) {
  return request({
    url: '/cancelOrder',
    data
  })
}
