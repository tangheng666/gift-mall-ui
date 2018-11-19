import request from '@/utils/request'

export function getAllNotice(param) {
  return request({
    url: '/noticeList',
    data: param
  })
}

export function topNotice() {
  return request({
    url: 'topNotice'
  })
}
