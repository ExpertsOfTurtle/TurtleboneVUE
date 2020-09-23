import request from '@/utils/request'

export function getRouterData(username, token) {
  const url = process.env.REST_APP + '/router/getData?username=' + username + '&token=' + token
  return request({
    url: url,
    method: 'GET'
  })
}
