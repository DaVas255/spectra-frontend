'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { userApi } from '@/entities/user/api/userApi'
import type { User } from '@/features/auth/lib/authSchemas'
import { clearUser } from '@/features/auth/model/authSlice'

const USER_KEYS = {
	profile: ['user', 'profile'] as const
}

export const useUser = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const queryClient = useQueryClient()
	const user = useAppSelector((state): User | null => state.auth.user)

	const { data: profile, isLoading: isProfileLoading } = useQuery({
		queryKey: USER_KEYS.profile,
		queryFn: userApi.getProfile,
		enabled: !!user,
		staleTime: 5 * 60 * 1000 // 5 minutes
	})

	const { mutate: logout, isPending: isLogoutLoading } = useMutation({
		mutationFn: userApi.logout,
		onSuccess: () => {
			localStorage.removeItem('accessToken')
			queryClient.clear()
			dispatch(clearUser())
			router.push('/login')
		}
	})

	return {
		user,
		profile,
		isProfileLoading,
		logout,
		isLogoutLoading,
		isAuthenticated: !!user
	}
}
