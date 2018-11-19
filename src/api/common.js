import request from '@/utils/request'

export function expressFee() {
  return request({
    url: '/expressFee'
  })
}
