'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

import { manageTrackedSitesApi } from '../api/manageTrackedSitesApi'

import type { CreateTrackedSite } from './types'
import { useExtensionKey } from '@/entities/extension-key'
import { useTrackedSite } from '@/entities/tracked-site'

export const useManageTrackedSites = () => {
	const queryClient = useQueryClient()
	const { extensionKey, isExtensionKeyLoading } = useExtensionKey()
	const { trackedSites, isTrackedSitesLoading } = useTrackedSite(
		extensionKey?.key
	)

	const { mutateAsync: createTrackedSite, isPending: isCreating } = useMutation(
		{
			mutationKey: ['manage-tracked-sites', 'create'],
			mutationFn: (payload: CreateTrackedSite) => {
				return manageTrackedSitesApi.addTrackedSite(payload)
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tracked-sites'] })
				message.success('Сайт успешно добавлен')
			},
			onError: (error: any) => {
				message.error(
					error?.response?.data?.message || 'Ошибка при добавлении сайта'
				)
			}
		}
	)

	const { mutateAsync: updateTrackedSite, isPending: isUpdating } = useMutation(
		{
			mutationKey: ['manage-tracked-sites', 'update'],
			mutationFn: (payload: { id: number } & CreateTrackedSite) => {
				return manageTrackedSitesApi.updateTrackedSite(payload.id, payload)
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tracked-sites'] })
				message.success('Сайт успешно обновлен')
			},
			onError: (error: any) => {
				message.error(
					error?.response?.data?.message || 'Ошибка при обновлении сайта'
				)
			}
		}
	)

	const { mutateAsync: deleteTrackedSite, isPending: isDeletePending } =
		useMutation({
			mutationKey: ['manage-tracked-sites', 'delete'],
			mutationFn: (siteId: number) => {
				return manageTrackedSitesApi.deleteTrackedSite(siteId)
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tracked-sites'] })
				message.success('Сайт успешно удален')
			},
			onError: (error: any) => {
				message.error(
					error?.response?.data?.message || 'Ошибка при удалении сайта'
				)
			}
		})

	return {
		trackedSites,
		createTrackedSite,
		updateTrackedSite,
		deleteTrackedSite,
		hasExtensionKey: !!extensionKey?.key,
		isCreating,
		isUpdating,
		isDeletePending,
		isLoading: isTrackedSitesLoading || isExtensionKeyLoading
	}
}
