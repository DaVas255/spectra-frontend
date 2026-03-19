import type { ResendVerificationInput } from '../model/verifyEmailSchema'

import { apiClient } from '@/shared/api'

export const verifyEmailApi = {
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
