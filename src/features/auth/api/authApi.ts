import {
	authResponseSchema,
	registerResponseSchema,
	userSchema
} from '@/features/auth'
import type {
	AuthResponse,
	LoginInput,
	RegisterInput,
	RegisterResponse,
	ResendVerificationInput,
	User
} from '@/features/auth'
import { apiClient } from '@/shared/api'

export const authApi = {
	login: async (data: LoginInput): Promise<AuthResponse> => {
		const response = await apiClient.post('/auth/login', data)
		return authResponseSchema.parse(response.data)
	},

	register: async (data: RegisterInput): Promise<RegisterResponse> => {
		const response = await apiClient.post('/auth/register', data)
		return registerResponseSchema.parse(response.data)
	},

	logout: async (): Promise<boolean> => {
		const response = await apiClient.post('/auth/logout')
		return response.data
	},

	refreshToken: async (): Promise<AuthResponse> => {
		const response = await apiClient.post('/auth/login/access-token')
		return authResponseSchema.parse(response.data)
	},

	getProfile: async (): Promise<User> => {
		const response = await apiClient.get('/auth/profile')
		return userSchema.parse(response.data)
	},

	verifyEmail: async (token: string): Promise<{ message: string }> => {
		const response = await apiClient.get(`/auth/verify-email/${token}`)
		return response.data
	},

	resendVerification: async (
		data: ResendVerificationInput
	): Promise<{ message: string }> => {
		const response = await apiClient.post('/auth/resend-verification', data)
		return response.data
	}
}
