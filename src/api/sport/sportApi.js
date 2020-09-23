import request from '@/utils/request'

export function filterData(data) {
  const url = process.env.REST_APP + '/keepSport/filterData'
  return request({
    url: url,
    method: 'POST',
    data: data
  })
}
export function groupData(data) {
  const url = process.env.REST_APP + '/keepSport/groupData'
  return request({
    url: url,
    method: 'POST',
    data: data
  })
}
export function syncData(data) {
  const url = process.env.REST_APP + '/keepSport/syncSportData'
  return request({
    url: url,
    method: 'POST',
    data: data
  })
}
