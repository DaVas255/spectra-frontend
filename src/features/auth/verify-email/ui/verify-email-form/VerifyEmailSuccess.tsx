import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import Link from 'next/link'

import styles from './VerifyEmailForm.module.scss'

const { Title, Paragraph } = Typography

export const VerifyEmailSuccess = () => {
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
