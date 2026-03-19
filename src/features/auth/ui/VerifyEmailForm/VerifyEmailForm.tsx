'use client'

import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	MailOutlined,
	ReloadOutlined
} from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import Link from 'next/link'

import { useVerifyEmail } from '../../lib/useVerifyEmail'

import { VerifyEmailError } from './VerifyEmailError'
import styles from './VerifyEmailForm.module.scss'
import { VerifyEmailLoading } from './VerifyEmailLoading'
import { VerifyEmailSuccess } from './VerifyEmailSuccess'

const { Title, Text, Paragraph } = Typography

export const VerifyEmailForm = () => {
	const {
		email,
		status,
		error,
		timeLeft,
		isTimerRunning,
		isVerifying,
		isResending,
		handleResend
	} = useVerifyEmail()

	if (status === 'loading' || isVerifying) return <VerifyEmailLoading />

	if (status === 'success') return <VerifyEmailSuccess />

	if (status === 'error')
		return (
			<VerifyEmailError
				email={email}
				error={error}
				handleResend={handleResend}
				isResending={isResending}
				isTimerRunning={isTimerRunning}
				timeLeft={timeLeft}
			/>
		)

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
					{email || 'загрузка...'}
				</Text>

				<Paragraph className={styles.hint}>
					Пожалуйста, проверьте вашу почту и перейдите по ссылке в письме для
					завершения регистрации.
				</Paragraph>

				<div className={styles.resendSection}>
					{isTimerRunning ? (
						<Text
							type='secondary'
							className={styles.timer}
						>
							Повторная отправка через {timeLeft}
						</Text>
					) : null}

					<Button
						type='link'
						onClick={handleResend}
						disabled={isTimerRunning || isResending || !email}
						loading={isResending}
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
