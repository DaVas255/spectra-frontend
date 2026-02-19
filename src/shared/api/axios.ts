import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { IS_CLIENT } from '../constants'
import { tokenService } from '../lib'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})

apiClient.interceptors.request.use(
	(config: CustomAxiosRequestConfig) => {
		const token = tokenService.getAccessToken()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const onRefreshed = (token: string) => {
	refreshSubscribers.forEach(callback => callback(token))
	refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
	refreshSubscribers.push(callback)
}

apiClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			if (originalRequest.url?.includes('/auth/')) {
				return Promise.reject(error)
			}

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
					`${apiClient.defaults.baseURL}/api/auth/login/access-token`,
					{},
					{
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)

				const { accessToken } = response.data

				if (!accessToken) {
					throw new Error('No access token in response')
				}

				tokenService.setAccessToken(accessToken)

				apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
				originalRequest.headers.Authorization = `Bearer ${accessToken}`

				onRefreshed(accessToken)
				isRefreshing = false

				return apiClient(originalRequest)
			} catch (refreshError) {
				isRefreshing = false
				refreshSubscribers = []
				tokenService.removeAccessToken()

				if (IS_CLIENT) {
					window.location.replace('/login')
				}

				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)
