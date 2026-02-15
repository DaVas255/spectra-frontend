import { userSchema } from '@/entities/user/model/types'
import type { User } from '@/entities/user/model/types'
import { apiClient } from '@/shared/api'

export const userApi = {
	getProfile: async (): Promise<User> => {
		const response = await apiClient.get('/auth/profile')
		return userSchema.parse(response.data)
	},

	logout: async (): Promise<boolean> => {
		const response = await apiClient.post('/auth/logout')
		return response.data
	}
}
