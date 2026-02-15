'use client'

import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	MailOutlined,
	ReloadOutlined
} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Card, Spin, Typography, message } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import styles from './VerifyEmailForm.module.scss'
import { authApi } from '@/features/auth'

const { Title, Text, Paragraph } = Typography

const RESEND_COOLDOWN = 60

type VerificationStatus = 'idle' | 'loading' | 'success' | 'error'

export const VerifyEmailForm = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [email, setEmail] = useState<string>('')
	const [countdown, setCountdown] = useState<number>(RESEND_COOLDOWN)
	const [canResend, setCanResend] = useState<boolean>(false)
	const [verificationStatus, setVerificationStatus] =
		useState<VerificationStatus>('idle')
	const [verificationError, setVerificationError] = useState<string | null>(
		null
	)

	const token = searchParams.get('token')
	const emailFromUrl = searchParams.get('email')

	const verifyMutation = useMutation({
		mutationFn: authApi.verifyEmail,
		onSuccess: () => {
			setVerificationStatus('success')
			localStorage.removeItem('pendingVerificationEmail')
			message.success('Email успешно подтвержден!')
			setTimeout(() => {
				router.push('/')
			}, 3000)
		},
		onError: (error: Error) => {
			setVerificationStatus('error')
			setVerificationError(error.message || 'Ошибка подтверждения email')
		}
	})

	const resendMutation = useMutation({
		mutationFn: authApi.resendVerification,
		onSuccess: () => {
			message.success('Письмо отправлено повторно')
			setCountdown(RESEND_COOLDOWN)
			setCanResend(false)
		},
		onError: (error: Error) => {
			message.error(error.message || 'Ошибка отправки письма')
		}
	})

	useEffect(() => {
		if (emailFromUrl) {
			setEmail(emailFromUrl)
			localStorage.setItem('pendingVerificationEmail', emailFromUrl)
		} else {
			const savedEmail = localStorage.getItem('pendingVerificationEmail')
			if (savedEmail) {
				setEmail(savedEmail)
			}
		}
	}, [emailFromUrl])

	useEffect(() => {
		if (token && verificationStatus === 'idle') {
			setVerificationStatus('loading')
			verifyMutation.mutate(token)
		}
	}, [token, verificationStatus, verifyMutation])

	useEffect(() => {
		if (countdown <= 0) {
			setCanResend(true)
			return
		}

		const timer = setInterval(() => {
			setCountdown(prev => prev - 1)
		}, 1000)

		return () => clearInterval(timer)
	}, [countdown])

	useEffect(() => {
		if (countdown === 0) {
			setCanResend(true)
		}
	}, [countdown])

	const handleResend = useCallback(() => {
		if (!email || !canResend) return
		resendMutation.mutate({ email })
	}, [email, canResend, resendMutation])

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	if (token) {
		if (verificationStatus === 'loading' || verificationStatus === 'idle') {
			return (
				<Card className={styles.card}>
					<div className={styles.loadingContainer}>
						<Spin size='large' />
						<Text>Подтверждение email...</Text>
					</div>
				</Card>
			)
		}

		if (verificationStatus === 'success') {
			return (
				<Card className={styles.card}>
					<div className={styles.container}>
						<div className={styles.iconContainer}>
							<CheckCircleOutlined
								className={`${styles.icon} ${styles.successIcon}`}
							/>
						</div>
						<Title
							level={3}
							className={styles.title}
						>
							Email подтвержден!
						</Title>
						<Paragraph className={styles.description}>
							Ваш email успешно подтвержден. Сейчас вы будете перенаправлены на
							главную страницу.
						</Paragraph>
					</div>
				</Card>
			)
		}

		if (verificationStatus === 'error') {
			return (
				<Card className={styles.card}>
					<div className={styles.container}>
						<div className={styles.iconContainer}>
							<CloseCircleOutlined
								className={`${styles.icon} ${styles.errorIcon}`}
							/>
						</div>
						<Title
							level={3}
							className={styles.title}
						>
							Ошибка подтверждения
						</Title>
						<Paragraph className={styles.description}>
							{verificationError}
						</Paragraph>
						{email && (
							<div className={styles.resendSection}>
								<Button
									type='primary'
									onClick={handleResend}
									loading={resendMutation.isPending}
									icon={<ReloadOutlined />}
								>
									Отправить письмо повторно
								</Button>
							</div>
						)}
					</div>
				</Card>
			)
		}
	}

	return (
		<Card className={styles.card}>
			<div className={styles.container}>
				<div className={styles.iconContainer}>
					<MailOutlined className={styles.icon} />
				</div>

				<Title
					level={3}
					className={styles.title}
				>
					Подтвердите ваш email
				</Title>

				<Paragraph className={styles.description}>
					Мы отправили письмо с подтверждением на адрес:
				</Paragraph>

				<Text
					strong
					className={styles.email}
				>
					{email || 'your@email.com'}
				</Text>

				<Paragraph className={styles.hint}>
					Пожалуйста, проверьте вашу почту и перейдите по ссылке в письме для
					завершения регистрации.
				</Paragraph>

				<div className={styles.resendSection}>
					{!canResend ? (
						<Text
							type='secondary'
							className={styles.timer}
						>
							Повторная отправка через {formatTime(countdown)}
						</Text>
					) : null}

					<Button
						type='link'
						onClick={handleResend}
						disabled={!canResend || resendMutation.isPending}
						loading={resendMutation.isPending}
						icon={<ReloadOutlined />}
						className={styles.resendButton}
					>
						Отправить письмо повторно
					</Button>
				</div>

				<div className={styles.helpSection}>
					<Text
						type='secondary'
						className={styles.helpText}
					>
						Не получили письмо? Проверьте папку &quot;Спам&quot; или убедитесь,
						что адрес email введен правильно.
					</Text>
				</div>
			</div>
		</Card>
	)
}
