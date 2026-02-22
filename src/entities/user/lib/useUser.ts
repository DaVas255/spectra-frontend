'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@/core/store'
import { clearUser, userApi } from '@/entities/user'

export const useUser = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const { mutate: logout, isPending: isLogoutLoading } = useMutation({
		mutationFn: userApi.logout,
		onSuccess: () => {
			dispatch(clearUser())
			router.push('/login')
		}
	})

	return {
		logout,
		isLogoutLoading
	}
}
