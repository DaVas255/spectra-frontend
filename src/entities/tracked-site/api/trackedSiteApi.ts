import { TrackedSite, trackedSiteSchema } from '../model/types'

import { apiClient } from '@/shared/api'

export const trackedSiteApi = {
	getTrackedSites: async (apiKey: string): Promise<TrackedSite[] | null> => {
		const response = await apiClient.get<TrackedSite[]>(
			'/public/tracked-sites',
			{
				headers: {
					'x-api-key': apiKey
				}
			}
		)
		if (!response.data) return null
		return trackedSiteSchema.array().parse(response.data)
	}
}
