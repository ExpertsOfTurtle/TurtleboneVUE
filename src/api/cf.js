import request from '@/utils/request'

export function filter(data) {
  return request({
    url: 'http://localhost/cf/task/filter',
    method: 'POST',
    data: data
  })
}

export function createTask(data) {
	return request({
		url: 'http://localhost/cf/task/insert',
		method: 'POST',
		data: data
  })
}
