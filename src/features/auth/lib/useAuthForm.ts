'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@/core/store'
import { AuthInput, authApi, authSchema, setUser } from '@/features/auth'

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

	const { user, isAuthenticated } = useAppSelector(state => state.auth)

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: authApi.login,
		onSuccess(data) {
			startTransition(() => {
				localStorage.setItem('accessToken', data.accessToken)
				queryClient.setQueryData(AUTH_KEYS.user, data.user)
				dispatch(setUser(data.user))
				router.push('/')
			})
		},
		onError(error) {}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: authApi.register,
		onSuccess: (_, variables) => {
			startTransition(() => {
				router.push(
					`/verify-email?email=${encodeURIComponent(variables.email)}`
				)
			})
		},
		onError(error) {}
	})

	const onSubmit: SubmitHandler<AuthInput> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	const isAuthFormLoading = isPending || isLoginPending || isRegisterPending

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		user,
		isAuthenticated,
		isAuthFormLoading
	}
}
