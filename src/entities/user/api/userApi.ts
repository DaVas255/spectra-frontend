import { apiClient } from '@/shared/api'

export const userApi = {
	logout: async (): Promise<boolean> => {
		const response = await apiClient.post('/auth/logout')
		return response.data
	}
}
