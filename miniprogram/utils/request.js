import { deepClone } from '@/utils/util'

class InterceptorManager {
	func
	constructor() {
		this.func = function(data) {
			return data;
		};
	}
	use(fn) {
		this.func = fn;
	}
}

class resultApi {
	constructor() {
		this.error = false
		this.msg = ''
		this.data = ''
	}
}

class Axios {
  static config
  static request
  static response
  #merge(axiosDefaultConfig, data, config) {
		let cloneAxios = deepClone(axiosDefaultConfig);
		let cloneData = deepClone(data);
		let cloneConfig = deepClone(config);
		return Object.assign(cloneAxios, cloneData, cloneConfig);
  }
  static addMethods() {
		Array.prototype.forEach.call(
			["GET", "POST", "PUT", "DELETE", "TRACE", "CONNECT", 'HEAD'],
			function(key) {
				Axios.prototype[key] = function(url, data, config) {
					return this.#httpRequest(
						this.#merge(
							Axios.config, {
								url: url,
								method: key,
								data: data,
							},
							config || {}
						)
					);
				};
			}
		);
	}
	#httpRequest(config) {
		return new Promise((resolve, reject) => {
			config = Axios.request.func(config);
			config.originUrl = config.url;
			config.url = config.url.startsWith("http") || config.url.startsWith("https") ? config.url : config.baseUrl + config.url;
			config.success = (res) => {
				resolve(Axios.response.func(res, config));
			};
			config.fail = (res) => {
				reject(Axios.responseError.func(res, config));
			};
			uni.request(config);
		});
	}
}

Axios.config = {
	url: '',
	baseUrl: wx.getAccountInfoSync().miniProgram.envVersion === 'develop' ? '' : '',
	originUrl: '',
	timeout: 60000,
	method: 'GET',
	retries: 1,
	success: () => {},
	fail: () => {},
	header: {
		'content-type': 'application/json'
	}
}
Axios.request = new InterceptorManager()
Axios.response = new InterceptorManager()
Axios.responseError = new InterceptorManager()
Axios.addMethods()

Axios.request.use((config) => {
	console.log('请求拦截器', config);
	const app = getApp()
	if (app.globalData.token) {
		config.header.token = app.globalData.token
	}
	return config
})

Axios.response.use((res, config) => {
  console.log(res, config);
  return res
})

Axios.responseError.use((res, config) => {
	const result = new resultApi()
	result.error = true
	result.data = res
	result.msg = '接口异常,请联系管理员'
	console.error('responseError:', res);
	return Promise.reject(result)
})

export default new Axios()