import request from '@/utils/request'

export function querySummary() {
  const url = process.env.REST_APP + '/ext/sinadx/dxj/querySummary'
  return request({
    url: url,
    method: 'GET'
  })
}
export function queryDetails(contentId) {
  const url = process.env.REST_APP + '/ext/sinadx/dxj/queryDetails?contentId=' + contentId
  return request({
    url: url,
    method: 'POST'
  })
}
