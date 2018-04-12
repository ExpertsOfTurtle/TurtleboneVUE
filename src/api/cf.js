import request from '@/utils/request'

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