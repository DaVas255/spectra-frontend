import { ExtensionKey, extensionKeySchema } from '../model/types'

import { apiClient } from '@/shared/api'

export const extensionKeyApi = {
	getExtensionKey: async (): Promise<ExtensionKey | null> => {
		const response = await apiClient.get<ExtensionKey>('/api-keys')
		if (!response.data) return null
		return extensionKeySchema.parse(response.data)
	}
}
