const bastURLone = "http://rambuild.cn:8888/api/private/v1";
const bastURL = "http://123.207.32.32:8000/api/h8"
const basturltwo = "https://api-hmugo-web.itheima.net/api/public/v1"
//promise 封装过的请求
export function loginrequest(opction) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: bastURLone + opction.url,
			method: opction.method || "GET",
			data: opction.data || {},
			success: res => {
				resolve(res)
			},
			fail: err => {
				resolve(err)
			}
		})
	})
}
//未经 promise 封住的请求  不能挂载到全局
export function shoprequest(opction, resolve, reject) {
	uni.request({
		url: bastURL + opction.url,
		method: opction.method || "GET",
		data: opction.data || {},
		success: res => {
			resolve(res)
			// uni.showToast({
			// 	title:"ddd"
			// })
		},
		fail: err => {
			reject(err)
		}
	})
}
//挂载到全局的请求
export function usershop(opction) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: basturltwo + opction.url,
			method: opction.method || "GET",
			data: opction.data || {},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//挂载到全局的请求
export function shopdetail(opction) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: bastURL + opction.url,
			method: opction.method || "GET",
			data: opction.data || {},
			success: res => {
				resolve(res)
			},
			fail: err => {
				resolve(err)
			}
		})
	})
}
