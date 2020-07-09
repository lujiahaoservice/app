// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
const http = (way, url, param, res) => {

	let token = "";
	token = uni.getStorageSync('yq_token');
	let baseUrl = 'https://api.yqyes.com' + '/' + url
	// let baseUrl = 'https://httpstat.us/500'
	uni.request({
		url: baseUrl,
		data: JSON.parse(JSON.stringify(param)),
		header: {
			'Authorization': token,
			'Accept': 'application/json',
			'Content-Type': 'application/json', //自定义请求头信息
		},
		method: way.toUpperCase(),
		success: (data) => {
			if (data.statusCode == 200) {
				console.log(url, data.data)
				res(JSON.parse(JSON.stringify(data.data)))
			} else if (data.statusCode == 401) {
				uni.hideLoading();
				uni.showToast({
					title: '请重新登录',
					icon: 'none',
					duration: 2000
				})
				uni.removeStorage({
					key: 'yq_token',
					success: function(res) {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			} else if (data.statusCode == 500) {
				uni.hideLoading();
				uni.showToast({
					title: '服务器错误',
					icon: 'none',
					duration: 2000
				})
				res(JSON.parse(JSON.stringify(data)))
			} else {
				uni.hideLoading();
				uni.showToast({
					title: data.data,
					icon: 'none',
					duration: 2000
				})
				res(JSON.parse(JSON.stringify(data)))
			}
		},
		fail: (data) => {
			res(data)
		}
	});


}

export default http
