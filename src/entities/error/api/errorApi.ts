import { ErrorsResponse, errorsResponseSchema } from '../model/types'

import { apiClient } from '@/shared/api'

export const errorApi = {
	getErrors: async (apiKey: string): Promise<ErrorsResponse> => {
		const response = await apiClient.get(`/errors`, {
			headers: {
				'x-api-key': apiKey
			}
		})

		return errorsResponseSchema.parse(response.data)
	}
}
