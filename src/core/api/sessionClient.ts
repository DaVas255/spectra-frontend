import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { apiClient } from '@/shared/api'
import { IS_CLIENT } from '@/shared/constants'
import { tokenService } from '@/shared/lib'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}

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
			!originalRequest._retry &&
			!originalRequest.url?.includes('/auth/login') &&
			!originalRequest.url?.includes('/auth/register')
		) {
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
					`${apiClient.defaults.baseURL}/auth/login/access-token`,
					{},
					{ withCredentials: true }
				)

				const { accessToken } = response.data

				if (!accessToken) {
					throw new Error('No access token in response')
				}

				tokenService.setAccessToken(accessToken)

				apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
				originalRequest.headers.Authorization = `Bearer ${accessToken}`

				onRefreshed(accessToken)
				return apiClient(originalRequest)
			} catch (refreshError) {
				refreshSubscribers = []
				tokenService.removeAccessToken()

				if (IS_CLIENT) {
					window.location.replace('/login')
				}

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export { apiClient as sessionClient }
