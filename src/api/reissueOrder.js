import request from '@/utils/request'

export function findReplacement(data) {
  return request({
    url: '/findReplacement',
    data
  })
}

export function replacement(data) {
  return request({
    url: '/replacement',
    data
  })
}
