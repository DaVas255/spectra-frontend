'use client'

import { BugOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Skeleton } from 'antd'

import styles from './RecentErrors.module.scss'
import { useError } from '@/entities/error'
import { useExtensionKey } from '@/entities/extension-key'
import { MetricCard } from '@/shared/ui/metric-card'

export const RecentErrors = () => {
	const { extensionKey, isExtensionKeyLoading } = useExtensionKey()
	const { errors, isLoading, isFetching, refetch } = useError(extensionKey?.key)

	if (isExtensionKeyLoading) {
		return (
			<Card
				title={
					<div className={styles.title}>
						<BugOutlined />
						<span>Последние ошибки</span>
					</div>
				}
			>
				<Skeleton
					active
					paragraph={{ rows: 4 }}
				/>
			</Card>
		)
	}

	if (!extensionKey?.key) {
		return (
			<Card
				title={
					<div className={styles.title}>
						<BugOutlined />
						<span>Последние ошибки</span>
					</div>
				}
				className={styles.recentErrors}
			>
				<Empty description='Ошибки не найдены' />
			</Card>
		)
	}

	if (isLoading || errors === undefined) {
		return (
			<Card
				title={
					<div className={styles.title}>
						<BugOutlined />
						<span>Последние ошибки</span>
					</div>
				}
			>
				<Skeleton
					active
					paragraph={{ rows: 4 }}
				/>
			</Card>
		)
	}

	return (
		<Card
			title={
				<div className={styles.title}>
					<BugOutlined />
					<span>Последние ошибки</span>
				</div>
			}
			className={styles.recentErrors}
			extra={
				<Button
					icon={<ReloadOutlined spin={isFetching} />}
					onClick={() => refetch()}
					disabled={isFetching}
				>
					Обновить
				</Button>
			}
		>
			{errors.length ? (
				<div className={styles.errorList}>
					{errors.map(error => (
						<MetricCard
							key={error.id}
							metric={error}
						/>
					))}
				</div>
			) : (
				<Empty description='Ошибки не найдены' />
			)}
		</Card>
	)
}
