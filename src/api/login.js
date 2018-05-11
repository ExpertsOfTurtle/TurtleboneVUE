import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function fakelogin(username, password) {
	console.log("username=" + username + ", password:" + password);
	var xx = new Date().getTime()
	  var rs = {
		  data : {
			  token : "abc" + xx
		  }
	  }
	return new Promise((resolve, reject) => {
		if (password != 'turtle') {
			reject(new Error('Password 错误'))
		} else {
			resolve(rs)
		}
	});
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
