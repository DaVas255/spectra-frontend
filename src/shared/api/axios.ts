import axios from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

apiClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
	refreshSubscribers.forEach(callback => callback(token))
	refreshSubscribers = []
}

function addRefreshSubscriber(callback: (token: string) => void) {
	refreshSubscribers.push(callback)
}

apiClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise(resolve => {
					addRefreshSubscriber(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(apiClient(originalRequest))
					})
				})
			}

			isRefreshing = true

			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200'}/api/auth/login/access-token`,
					{},
					{ withCredentials: true }
				)

				const { accessToken } = response.data
				localStorage.setItem('accessToken', accessToken)

				apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
				originalRequest.headers.Authorization = `Bearer ${accessToken}`

				onRefreshed(accessToken)
				isRefreshing = false

				return apiClient(originalRequest)
			} catch (refreshError) {
				isRefreshing = false
				localStorage.removeItem('accessToken')
				window.location.href = '/login'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)
