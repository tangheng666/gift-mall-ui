import request from '@/utils/request'
export function goodsList(data) {
  return request({
    url: '/goodsList',
    data
  })
}
