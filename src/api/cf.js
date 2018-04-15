import request from '@/utils/request'

export function listAllUsername() {
	return request({
	  url: 'cf/user/all',
	  method: 'POST'
  })
}

export function filter(data) {
  return request({
    url: 'cf/task/filter',
    method: 'POST',
    data: data
  })
}

export function createTask(data) {
	return request({
		url: 'cf/task/insert',
		method: 'POST',
		data: data
  })
}

export function deleteTask(id) {
	return request({
		url: 'cf/task/delete/' +id,
		method: 'POST'
  })
}
export function filterSubmission(data) {
	return request({
	  url: 'cf/cf/filter',
	  method: 'POST',
	  data: data
  })
}
export function syncSubmission() {
	return request({
	  url: 'cf/cf/syncSubmission',
	  method: 'GET'
  })
}
export function sendWeeklyReport(data) {
	return request({
	  url: 'cf/report/weekly',
	  method: 'POST',
	  data : data
  })
}
