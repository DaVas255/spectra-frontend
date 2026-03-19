'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signUpApi } from '../api/signUpApi'

import { SignUpInput, signUpSchema } from './signUpSchema'

interface SignUpErrorResponse {
	message?: string
}

export const useSignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema)
	})
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const { mutate, isPending: isRegisterPending } = useMutation({
		mutationKey: ['sign-up'],
		mutationFn: signUpApi.register,
		onSuccess: (_, variables) => {
			startTransition(() => {
				router.push(
					`/verify-email?email=${encodeURIComponent(variables.email)}`
				)
			})
		},
		onError(error: AxiosError<SignUpErrorResponse>) {
			message.error(error.response?.data.message || 'Ошибка регистрации')
		}
	})

	const onSubmit: SubmitHandler<SignUpInput> = data => {
		mutate(data)
	}

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isSignUpLoading: isPending || isRegisterPending
	}
}
