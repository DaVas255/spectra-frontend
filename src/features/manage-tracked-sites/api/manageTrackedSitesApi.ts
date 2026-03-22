import type { CreateTrackedSite } from '../model/types'

import { trackedSiteSchema } from '@/entities/tracked-site'
import type { TrackedSite } from '@/entities/tracked-site'
import { apiClient } from '@/shared/api'

export const manageTrackedSitesApi = {
	addTrackedSite: async (payload: CreateTrackedSite): Promise<TrackedSite> => {
		const response = await apiClient.post<TrackedSite>(
			'/tracked-sites',
			payload
		)

		return trackedSiteSchema.parse(response.data)
	},

	updateTrackedSite: async (
		siteId: number,
		payload: CreateTrackedSite
	): Promise<TrackedSite> => {
		const response = await apiClient.put<TrackedSite>(
			`/tracked-sites/${siteId}`,
			payload
		)

		return trackedSiteSchema.parse(response.data)
	},

	deleteTrackedSite: async (siteId: number): Promise<void> => {
		await apiClient.delete(`/tracked-sites/${siteId}`)
	}
}
