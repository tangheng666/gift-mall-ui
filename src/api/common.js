import request from '@/utils/request'

export function expressFee() {
  return request({
    url: '/expressFee'
  })
}

export function uploadFroala(param) {
  return request({
    url: '/common/uploadFroala',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
