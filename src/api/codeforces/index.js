import request from '@/utils/request'

export function filterSubmission(param) {
  return request({
    url: process.env.REST_APP + '/cf/submission',
    method: 'POST',
    data: param
  })
}
export function syncSubmission() {
  return request({
    url: process.env.REST_APP + '/cf/sync',
    method: 'POST',
    data: {
      username: 'scorpiowf',
      from: 1,
      count: 50
    }
  })
}
