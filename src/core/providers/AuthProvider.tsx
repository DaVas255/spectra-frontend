'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { useAppDispatch } from '@/core/store'
import { clearUser, setUser } from '@/entities/user'
import { authApi } from '@/features/auth'
import { PUBLIC_ROUTES } from '@/shared/constants'
import { tokenService } from '@/shared/lib'

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	const dispatch = useAppDispatch()

	const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

	useEffect(() => {
		if (isPublicRoute) {
			return
		}

		const init = async () => {
			try {
				const { accessToken, user } = await authApi.refreshToken()
				tokenService.setAccessToken(accessToken)
				dispatch(setUser(user))
			} catch {
				tokenService.removeAccessToken()
				dispatch(clearUser())
			}
		}

		init()
	}, [])

	return children
}
