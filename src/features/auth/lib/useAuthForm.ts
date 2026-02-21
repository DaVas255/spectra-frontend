'use client'

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@/core/store'
import { AuthInput, authApi, authSchema, setUser } from '@/features/auth'
import { formatApiError } from '@/shared/lib/utils/error'

const AUTH_KEYS = {
	user: ['auth', 'user'] as const,
	profile: ['auth', 'profile'] as const
}

export const useAuthForm = (isLogin: boolean) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthInput>({
		resolver: zodResolver(authSchema)
	})
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const queryClient = useQueryClient()
	const [apiError, setApiError] = useState<string | null>(null)

	const { user, isAuthenticated } = useAppSelector(state => state.auth)

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: authApi.login,
		onSuccess(data) {
			setApiError(null)
			startTransition(() => {
				localStorage.setItem('accessToken', data.accessToken)
				queryClient.setQueryData(AUTH_KEYS.user, data.user)
				dispatch(setUser(data.user))
				router.push('/')
			})
		},
		onError(error: any) {
			setApiError(null)

			if (error.response?.status === 403 && error.response?.data?.email) {
				const email = error.response.data.email
				message.warning('Пожалуйста, подтвердите ваш email')
				router.push(`/verify-email?email=${encodeURIComponent(email)}`)
				return
			}

			setApiError(formatApiError(error))
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: authApi.register,
		onSuccess: (_, variables) => {
			setApiError(null)
			startTransition(() => {
				router.push(
					`/verify-email?email=${encodeURIComponent(variables.email)}`
				)
			})
		},
		onError(error: any) {
			setApiError(formatApiError(error))
		}
	})

	const onSubmit: SubmitHandler<AuthInput> = data => {
		setApiError(null)
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	const isAuthFormLoading = isPending || isLoginPending || isRegisterPending

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		apiError,
		user,
		isAuthenticated,
		isAuthFormLoading
	}
}
