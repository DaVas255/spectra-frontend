import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import Link from 'next/link'

import styles from './VerifyEmailForm.module.scss'

const { Title, Paragraph } = Typography

export const VerifyEmailError = ({
	email,
	error,
	handleResend,
	isResending,
	isTimerRunning,
	timeLeft
}: {
	email: string
	error: string | null
	handleResend: () => void
	isResending: boolean
	isTimerRunning: boolean
	timeLeft: string
}) => {
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
