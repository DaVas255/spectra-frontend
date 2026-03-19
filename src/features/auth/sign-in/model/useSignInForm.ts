'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signInApi } from '../api/signInApi'

import { SignInInput, signInSchema } from './signInSchema'
import { useAppDispatch } from '@/core/store'
import { setUser } from '@/entities/user'
import { tokenService } from '@/shared/lib'

interface SignInErrorResponse {
	email?: string
	message?: string
}

export const useSignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignInInput>({
		resolver: zodResolver(signInSchema)
	})
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const { mutate, isPending: isLoginPending } = useMutation({
		mutationKey: ['sign-in'],
		mutationFn: signInApi.login,
		onSuccess(data) {
			startTransition(() => {
				tokenService.setAccessToken(data.accessToken)
				dispatch(setUser(data.user))
				router.push('/')
			})
		},
		onError(error: AxiosError<SignInErrorResponse>) {
			if (error.response?.status === 403 && error.response?.data?.email) {
				const email = error.response.data.email
				message.warning('Пожалуйста, подтвердите ваш email')
				router.push(`/verify-email?email=${encodeURIComponent(email)}`)
				return
			}

			message.error(error.response?.data.message || 'Ошибка авторизации')
		}
	})

	const onSubmit: SubmitHandler<SignInInput> = data => {
		mutate(data)
	}

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isSignInLoading: isPending || isLoginPending
	}
}
