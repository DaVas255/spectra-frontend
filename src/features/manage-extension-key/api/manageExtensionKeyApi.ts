import { extensionKeySchema } from '@/entities/extension-key'
import type { ExtensionKey } from '@/entities/extension-key'
import { apiClient } from '@/shared/api'

export const manageExtensionKeyApi = {
	generateExtensionKey: async (): Promise<ExtensionKey> => {
		const response = await apiClient.post<ExtensionKey>('/api-keys', {
			name: 'Chrome Extension'
		})
		return extensionKeySchema.parse(response.data)
	},

	deleteExtensionKey: async (): Promise<void> => {
		await apiClient.delete('/api-keys')
	}
}
