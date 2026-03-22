'use client'

import { useQuery } from '@tanstack/react-query'

import { trackedSiteApi } from '../api/trackedSiteApi'

export const useTrackedSite = (apiKey?: string) => {
	const { data: trackedSites, isLoading: isTrackedSitesLoading } = useQuery({
		queryKey: ['tracked-sites', apiKey],
		queryFn: () => trackedSiteApi.getTrackedSites(apiKey ?? ''),
		enabled: !!apiKey
	})

	return {
		trackedSites,
		isTrackedSitesLoading
	}
}
