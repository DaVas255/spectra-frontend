import {
	authResponseSchema,
	registerResponseSchema,
	userSchema
} from '@/features/auth'
import type {
	AuthInput,
	AuthResponse,
	RegisterResponse,
	ResendVerificationInput,
	User
} from '@/features/auth'
import { apiClient } from '@/shared/api'

export const authApi = {
	login: async (data: AuthInput): Promise<AuthResponse> => {
		const response = await apiClient.post('/auth/login', data)
		return authResponseSchema.parse(response.data)
	},

	register: async (data: AuthInput): Promise<RegisterResponse> => {
		const response = await apiClient.post('/auth/register', data)
		return registerResponseSchema.parse(response.data)
	},

	refreshToken: async (): Promise<AuthResponse> => {
		const response = await apiClient.post('/auth/login/access-token')
		return authResponseSchema.parse(response.data)
	},

	verifyEmail: async (token: string): Promise<{ message: string }> => {
		const response = await apiClient.post('/auth/verify-email', { token })
		return response.data
	},

	resendVerification: async (
		data: ResendVerificationInput
	): Promise<{ message: string }> => {
		const response = await apiClient.post('/auth/resend-verification', data)
		return response.data
	}
}
