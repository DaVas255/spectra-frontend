'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { logoutApi } from '../api/logoutApi'

import { useAppDispatch } from '@/core/store'
import { clearUser } from '@/entities/user'

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const { mutate: logout, isPending: isLogoutLoading } = useMutation({
		mutationFn: logoutApi.logout,
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
