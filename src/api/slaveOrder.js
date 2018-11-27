import request from '@/utils/request'

export function fetchOrderSon(data) {
  return request({
    url: '/fetchOrderSon',
    data
  })
}
