import { signInResponseSchema } from '../model/signInSchema'
import type { SignInInput, SignInResponse } from '../model/signInSchema'

import { apiClient } from '@/shared/api'

export const signInApi = {
	login: async (data: SignInInput): Promise<SignInResponse> => {
		const response = await apiClient.post('/auth/login', data)
		return signInResponseSchema.parse(response.data)
	},

	refreshToken: async (): Promise<SignInResponse> => {
		const response = await apiClient.post('/auth/login/access-token')
		return signInResponseSchema.parse(response.data)
	}
}
