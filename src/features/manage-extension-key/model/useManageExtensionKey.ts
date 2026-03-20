'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

import { manageExtensionKeyApi } from '../api/manageExtensionKeyApi'

export const useManageExtensionKey = () => {
	const queryClient = useQueryClient()

	const { mutate: generateExtensionKey, isPending: isGeneratePending } =
		useMutation({
			mutationKey: ['manage-extension-key', 'generate'],
			mutationFn: manageExtensionKeyApi.generateExtensionKey,
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['extension-key'] })
				message.success('Ключ успешно сгенерирован')
			},
			onError: (error: any) => {
				message.error(
					error?.response?.data?.message || 'Ошибка при генерации ключа'
				)
			}
		})

	const { mutate: deleteExtensionKey, isPending: isDeletePending } =
		useMutation({
			mutationKey: ['manage-extension-key', 'delete'],
			mutationFn: manageExtensionKeyApi.deleteExtensionKey,
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['extension-key'] })
				message.success('Ключ успешно удален')
			},
			onError: (error: any) => {
				message.error(
					error?.response?.data?.message || 'Ошибка при удалении ключа'
				)
			}
		})

	return {
		generateExtensionKey,
		isGeneratePending,
		deleteExtensionKey,
		isDeletePending
	}
}
