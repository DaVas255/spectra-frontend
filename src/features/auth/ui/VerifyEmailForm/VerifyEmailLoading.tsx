import { Card, Spin, Typography } from 'antd'

import styles from './VerifyEmailForm.module.scss'

const { Text } = Typography

export const VerifyEmailLoading = () => {
	return (
		<Card className={styles.card}>
			<div className={styles.loadingContainer}>
				<Spin size='large' />
				<Text>Подтверждение email...</Text>
			</div>
		</Card>
	)
}
