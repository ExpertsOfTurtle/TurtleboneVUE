import request from '@/utils/request'

export function getDairyType() {
	return [99, 0, 1, 2, 3]
}
export function getDairyStatus() {
	return [0, 2]
}
export function getDairyTypeDesp(data) {
	const typeMap = {
    	99 : 'All',
    	0 : 'Codeforces',
    	1 : '普通',
    	2 : '梦',
    	3 : '原创'
    }
	return typeMap[data]
}
export function getDairySubType() {
	return  {
    	0: [0, 1, 2],
    	1: [10, 11],
    	3: [30, 31, 32]
    }
}
export function getDairySubTypeDesp(data) {
	const typeMap = {
    	0 : '翻译',
    	1 : '收藏',
    	2 : '题解',
    	10 : '想法',
    	11 : '学习',
    	30 : '',
    	31 : '',
    	32 : ''
    }
	return typeMap[data]
}
export function getDairyStatusDesp(val) {
	const statusMap = {
		0 : '普通',
		1 : '过期',
		2 : '已删除'
	}
	return statusMap[val]
}