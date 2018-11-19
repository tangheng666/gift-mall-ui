import request from '@/utils/request'

export function getFundsDetail(data) {
  return request({
    url: '/fundsDetail',
    data
  })
}
