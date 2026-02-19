'use client'

import { HomeOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import Link from 'next/link'
import { useEffect } from 'react'

const { Text } = Typography

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error('Application error:', error)
	}, [error])

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '24px'
			}}
		>
			<Result
				status='error'
				style={{ color: '#fff' }}
				subTitle={
					<div style={{ maxWidth: 500, margin: '0 auto' }}>
						<Text
							type='secondary'
							style={{ color: '#fff', fontSize: 18 }}
						>
							Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить
							страницу или вернуться на главную.
						</Text>
						{error.message && (
							<div
								style={{
									marginTop: 16,
									padding: 12,
									borderRadius: 4
								}}
							>
								<Text
									type='danger'
									style={{ fontSize: 16 }}
								>
									{error.message}
								</Text>
							</div>
						)}
						{error.digest && (
							<Text
								type='secondary'
								style={{ fontSize: 11, display: 'block', marginTop: 8 }}
							>
								Код ошибки: {error.digest}
							</Text>
						)}
					</div>
				}
				extra={[
					<Link
						href='/'
						key='home'
					>
						<Button icon={<HomeOutlined />}>На главную</Button>
					</Link>
				]}
			/>
		</div>
	)
}
