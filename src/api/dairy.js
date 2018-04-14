import request from '@/utils/request'

export function filter(data) {
  return request({
    url: 'dairy/dairy/filter',
    method: 'POST',
    data: data
  })
}

export function createDairy(data) {
	return request({
		url: 'dairy/dairy/insert',
		method: 'POST',
		data: data
  })
}

export function deleteDairy(id) {
	return request({
		url: 'dairy/dairy/delete/' +id,
		method: 'POST'
  })
}

export function modifyDairy(data) {
	return request({
	  url: 'dairy/dairy/modify',
	  method: 'POST',
	  data : data
  })
}

export function listAllUsername() {
	return request({
	  url: 'dairy/user/all',
	  method: 'POST'
  })
}