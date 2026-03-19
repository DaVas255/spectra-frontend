import { signUpResponseSchema } from '../model/signUpSchema'
import type { SignUpInput, SignUpResponse } from '../model/signUpSchema'

import { apiClient } from '@/shared/api'

export const signUpApi = {
	register: async (data: SignUpInput): Promise<SignUpResponse> => {
		const response = await apiClient.post('/auth/register', data)
		return signUpResponseSchema.parse(response.data)
	}
}
