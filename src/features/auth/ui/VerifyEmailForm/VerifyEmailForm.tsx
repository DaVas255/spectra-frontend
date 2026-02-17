'use client'

import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	MailOutlined,
	ReloadOutlined
} from '@ant-design/icons'
import { Button, Card, Spin, Typography } from 'antd'
import Link from 'next/link'

import styles from './VerifyEmailForm.module.scss'
import { useVerifyEmail } from '@/features/auth'

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

	if (status === 'loading' || isVerifying) {
		return (
			<Card className={styles.card}>
				<div className={styles.loadingContainer}>
					<Spin size='large' />
					<Text>Подтверждение email...</Text>
				</div>
			</Card>
		)
	}

	if (status === 'success') {
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
					<Link href='/'>
						<Button type='primary'>На главную</Button>
					</Link>
				</div>
			</Card>
		)
	}

	if (status === 'error') {
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
					<Paragraph className={styles.description}>{error}</Paragraph>
					{email && (
						<Button
							type='primary'
							onClick={handleResend}
							loading={isResending}
							disabled={isTimerRunning}
							icon={<ReloadOutlined />}
							style={{ marginBottom: 16 }}
						>
							{isTimerRunning
								? `Подождите ${timeLeft}`
								: 'Отправить письмо повторно'}
						</Button>
					)}
					<Link href='/'>
						<Button type='link'>На главную</Button>
					</Link>
				</div>
			</Card>
		)
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
