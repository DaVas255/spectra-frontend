import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

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
