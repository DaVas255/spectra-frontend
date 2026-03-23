'use client'

import { useQuery } from '@tanstack/react-query'

import { errorApi } from '../api/errorApi'

export const useError = (apiKey?: string) => {
	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['errors', apiKey],
		queryFn: () => errorApi.getErrors(apiKey ?? ''),
		enabled: !!apiKey,
		refetchInterval: 1000 * 30
	})

	return {
		errors: data?.errors,
		pagination: data?.pagination,
		isLoading,
		isFetching,
		refetch
	}
}
