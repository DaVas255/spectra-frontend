'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import '@/core/api/sessionClient'
import { PUBLIC_ROUTES } from '@/core/config/publicRoutes'
import { useAppDispatch } from '@/core/store'
import { clearUser, setUser } from '@/entities/user'
import { signInApi } from '@/features/auth/sign-in'
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
				const { accessToken, user } = await signInApi.refreshToken()
				tokenService.setAccessToken(accessToken)
				dispatch(setUser(user))
			} catch {
				tokenService.removeAccessToken()
				dispatch(clearUser())
			}
		}

		init()
	}, [dispatch, isPublicRoute])

	return children
}
