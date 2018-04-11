import request from '@/utils/request'

export function createBet(data) {
  return request({
    url: 'http://turtlebone.top/bet/bet/createBet',
    method: 'POST',
    data: data
  })
}

export function listBet(data) {
	return request({
		url: 'http://turtlebone.top/bet/bet/listBet',
		method: 'POST'
  })
}

export function inputBet(data) {
	return request({
		url: 'http://turtlebone.top/bet/bet/inputBet',
		method: 'POST',
		data : data
  })
}

export function queryBet(bid) {
	return request({
		url: 'http://turtlebone.top/bet/bet/queryBet/' + bid,
		method: 'POST'
  })
}