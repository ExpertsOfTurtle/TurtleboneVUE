import request from '@/utils/request'

export function createBet(data) {
  return request({
    url: 'bet/bet/createBet',
    method: 'POST',
    data: data
  })
}

export function listBet(data) {
	return request({
		url: 'bet/bet/listBet',
		method: 'POST'
  })
}

export function inputBet(data) {
	return request({
		url: 'bet/bet/inputBet',
		method: 'POST',
		data : data
  })
}

export function queryBet(bid) {
	return request({
		url: 'bet/bet/queryBet/' + bid,
		method: 'POST'
  })
}

export function deleteBet(bid) {
	return request({
		url: 'bet/bet/deleteBet/' + bid,
		method: 'POST'
  })
}