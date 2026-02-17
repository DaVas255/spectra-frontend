'use client'

import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { authApi } from '../api/authApi'

import { formatTime, useTimer } from '@/shared/lib'

const RESEND_COOLDOWN = 60

export type VerificationStatus = 'idle' | 'loading' | 'success' | 'error'

export const useVerifyEmail = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

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
		mutationFn: authApi.verifyEmail,
		onSuccess: () => {
			setStatus('success')
			message.success('Email успешно подтвержден!')
			setTimeout(() => {
				router.push('/')
			}, 2000)
		},
		onError: (err: any) => {
			setStatus('error')
			setError(err.message || 'Ошибка подтверждения email')
		}
	})

	const resendMutation = useMutation({
		mutationFn: authApi.resendVerification,
		onSuccess: () => {
			message.success('Письмо отправлено повторно')
			resetTimer()
			startTimer()
		},
		onError: (err: any) => {
			message.error(err.message || 'Ошибка отправки письма')
		}
	})

	useEffect(() => {
		if (emailFromUrl) {
			setEmail(emailFromUrl)
		}
	}, [emailFromUrl])

	useEffect(() => {
		if (token && status === 'idle') {
			setStatus('loading')
			verifyMutation.mutate(token)
		}
	}, [token, status])

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
