'use client'

import { useQuery } from '@tanstack/react-query'

import { extensionKeyApi } from '../api/extensionKeyApi'

export const useExtensionKey = () => {
	const { data: extensionKey, isLoading: isExtensionKeyLoading } = useQuery({
		queryKey: ['extension-key'],
		queryFn: () => extensionKeyApi.getExtensionKey()
	})

	return {
		extensionKey,
		isExtensionKeyLoading
	}
}
