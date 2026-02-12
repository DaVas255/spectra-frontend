import axios from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
})

apiClient.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => response,
	error => {
		return Promise.reject(error)
	}
)
