'use client'

import {
	CopyOutlined,
	DeleteOutlined,
	KeyOutlined,
	WarningOutlined
} from '@ant-design/icons'
import {
	Alert,
	Button,
	Card,
	Divider,
	Skeleton,
	Space,
	Tooltip,
	Typography
} from 'antd'

import { useManageExtensionKey } from '../model/useManageExtensionKey'

import styles from './ManageExtensionKey.module.scss'
import { useExtensionKey } from '@/entities/extension-key'

const { Paragraph } = Typography

export const ManageExtensionKey = () => {
	const { extensionKey, isExtensionKeyLoading } = useExtensionKey()
	const {
		generateExtensionKey,
		isGeneratePending,
		deleteExtensionKey,
		isDeletePending
	} = useManageExtensionKey()

	if (isExtensionKeyLoading) {
		return (
			<Card
				className={styles.mainContainer}
				title={
					<div className={styles.header}>
						<KeyOutlined />
						<span>Ключ API расширения</span>
					</div>
				}
			>
				<Space
					orientation='vertical'
					size='middle'
					className={styles.mainContainer}
				>
					<Skeleton.Button
						active
						block
					/>
					<Skeleton.Input
						active
						block
					/>
					<Skeleton
						active
						paragraph={{ rows: 3 }}
					/>
				</Space>
			</Card>
		)
	}

	return (
		<Card
			className={styles.mainContainer}
			title={
				<div className={styles.header}>
					<KeyOutlined />
					<span>Ключ API расширения</span>
				</div>
			}
			extra={
				<span className={styles.extraText}>
					Для подключения Spectra Monitor
				</span>
			}
		>
			<Space
				orientation='vertical'
				className={styles.mainContainer}
			>
				{extensionKey ? (
					<Alert
						title='Ключ сгенерирован'
						description='Используйте этот ключ в настройках Chrome-расширения'
						type='success'
						showIcon
						icon={<KeyOutlined />}
					/>
				) : (
					<Alert
						title='Ключ не сгенерирован'
						description='Сгенерируйте API-ключ для настройки Chrome-расширения'
						type='info'
						showIcon
						icon={<WarningOutlined />}
					/>
				)}

				{extensionKey && (
					<Space
						orientation='vertical'
						className={styles.mainContainer}
					>
						<span className={styles.keyLabel}>Ваш API-ключ:</span>
						<Paragraph
							className={styles.keyField}
							style={{ margin: 0, fontSize: 16 }}
							copyable={{
								tooltips: ['Копировать', 'Скопировано'],
								icon: [
									<CopyOutlined key='copy' />,
									<CopyOutlined key='copied' />
								]
							}}
						>
							{extensionKey.key}
						</Paragraph>
					</Space>
				)}

				<Divider
					className={styles.divider}
					style={{ margin: '8px 0' }}
				/>

				<Paragraph className={styles.description}>
					Чтобы подключить Spectra Monitor к расширению, нужно сгенерировать
					API-ключ. Ключ привязывается к вашему аккаунту и используется для
					аутентификации расширения при отправке логов.
				</Paragraph>

				<div className={styles.buttonContainer}>
					{extensionKey ? (
						<Tooltip title='Удалить текущий ключ'>
							<Button
								danger
								icon={<DeleteOutlined />}
								loading={isDeletePending}
								onClick={() => deleteExtensionKey()}
							>
								Удалить ключ
							</Button>
						</Tooltip>
					) : (
						<Button
							type='primary'
							size='large'
							icon={<KeyOutlined />}
							loading={isGeneratePending}
							onClick={() => generateExtensionKey()}
						>
							Сгенерировать API-ключ
						</Button>
					)}
				</div>
			</Space>
		</Card>
	)
}
