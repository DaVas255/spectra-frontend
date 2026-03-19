import { apiClient } from '@/shared/api'

export const logoutApi = {
	logout: async (): Promise<boolean> => {
		const response = await apiClient.post('/auth/logout')
		return response.data
	}
}
