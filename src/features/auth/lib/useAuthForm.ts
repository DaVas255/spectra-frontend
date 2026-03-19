'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '../api/authApi'

import { AuthInput, authSchema } from './authSchemas'
import { useAppDispatch } from '@/core/store'
import { setUser } from '@/entities/user'
import { tokenService } from '@/shared/lib'

interface AuthErrorResponse {
	email?: string
	message?: string
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

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: authApi.login,
		onSuccess(data) {
			startTransition(() => {
				tokenService.setAccessToken(data.accessToken)
				dispatch(setUser(data.user))
				router.push('/')
			})
		},
		onError(error: AxiosError<AuthErrorResponse>) {
			if (error.response?.status === 403 && error.response?.data?.email) {
				const email = error.response.data.email
				message.warning('Пожалуйста, подтвердите ваш email')
				router.push(`/verify-email?email=${encodeURIComponent(email)}`)
				return
			}

			message.error(error.response?.data.message || 'Ошибка авторизации')
		}
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
		onError(error: AxiosError<AuthErrorResponse>) {
			message.error(error.response?.data.message || 'Ошибка регистрации')
		}
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
		isAuthFormLoading
	}
}
