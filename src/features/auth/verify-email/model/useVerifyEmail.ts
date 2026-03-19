'use client'

import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { verifyEmailApi } from '../api/verifyEmailApi'

import { formatTime, useTimer } from '@/shared/lib'

const RESEND_COOLDOWN = 60

export type VerificationStatus = 'idle' | 'loading' | 'success' | 'error'

interface VerifyEmailErrorResponse {
	message?: string
}

export const useVerifyEmail = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const hasRequestedVerificationRef = useRef(false)

	const [email, setEmail] = useState<string>('')
	const [status, setStatus] = useState<VerificationStatus>('idle')
	const [error, setError] = useState<string | null>(null)

	const token = searchParams.get('token')
	const emailFromUrl = searchParams.get('email')

	const {
		timeLeft,
		isRunning,
		start: startTimer,
		reset: resetTimer
	} = useTimer({
		seconds: RESEND_COOLDOWN,
		autoStart: true
	})

	const verifyMutation = useMutation({
		mutationFn: verifyEmailApi.verifyEmail,
		onSuccess: () => {
			setStatus('success')
			message.success('Email успешно подтвержден!')
			setTimeout(() => {
				router.push('/')
			}, 2000)
		},
		onError: (err: AxiosError<VerifyEmailErrorResponse>) => {
			setStatus('error')
			setError(err.response?.data?.message || 'Ошибка подтверждения email')
			message.error(err.response?.data?.message || 'Ошибка подтверждения email')
		}
	})

	const resendMutation = useMutation({
		mutationFn: verifyEmailApi.resendVerification,
		onSuccess: () => {
			message.success('Письмо отправлено повторно')
			resetTimer()
			startTimer()
		},
		onError: (err: AxiosError<VerifyEmailErrorResponse>) => {
			setStatus('error')
			setError(err.response?.data?.message || 'Ошибка отправки письма')
			message.error(err.response?.data?.message || 'Ошибка отправки письма')
		}
	})

	useEffect(() => {
		if (emailFromUrl) {
			setEmail(emailFromUrl)
		}
	}, [emailFromUrl])

	useEffect(() => {
		if (!token || hasRequestedVerificationRef.current) {
			return
		}

		hasRequestedVerificationRef.current = true
		setStatus('loading')
		verifyMutation.mutate(token)
	}, [token])

	const handleResend = () => {
		if (!email || isRunning || resendMutation.isPending) return
		resendMutation.mutate({ email })
	}

	return {
		email,
		status,
		error,
		timeLeft: formatTime(timeLeft),
		isTimerRunning: isRunning,
		isVerifying: verifyMutation.isPending,
		isResending: resendMutation.isPending,
		verifyError: verifyMutation.error,
		resendError: resendMutation.error,
		handleResend
	}
}
