'use client'

import {
	DeleteOutlined,
	EditOutlined,
	LinkOutlined,
	PlusOutlined
} from '@ant-design/icons'
import { Alert, Button, Card, Empty, Skeleton, Tooltip } from 'antd'
import { useState } from 'react'

import { useManageTrackedSites } from '../model/useManageTrackedSites'

import styles from './ManageTrackedSites.module.scss'
import { SiteModal } from './SiteModal'
import type { TrackedSite } from '@/entities/tracked-site'

export const ManageTrackedSites = () => {
	const { trackedSites, hasExtensionKey, isLoading, deleteTrackedSite } =
		useManageTrackedSites()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingSite, setEditingSite] = useState<TrackedSite | null>(null)

	const openAddModal = () => {
		setEditingSite(null)
		setIsModalOpen(true)
	}

	const openEditModal = (site: TrackedSite) => {
		setEditingSite(site)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setEditingSite(null)
	}

	if (isLoading) {
		return (
			<Card
				className={styles.mainContainer}
				title={
					<div className={styles.header}>
						<LinkOutlined />
						<span>Управление отслеживаемыми сайтами</span>
					</div>
				}
				extra={
					<Skeleton.Button
						active
						size='small'
					/>
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
		<>
			<Card
				className={styles.mainContainer}
				title={
					<div className={styles.header}>
						<LinkOutlined />
						<span>Управление отслеживаемыми сайтами</span>
					</div>
				}
				extra={
					<Button
						type='primary'
						icon={<PlusOutlined />}
						disabled={!hasExtensionKey}
						onClick={openAddModal}
					>
						Добавить сайт
					</Button>
				}
			>
				{!hasExtensionKey ? (
					<Alert
						type='info'
						showIcon
						title='Сначала создайте API-ключ расширения'
						description='После этого список отслеживаемых сайтов станет доступен.'
					/>
				) : trackedSites?.length ? (
					<div className={styles.siteList}>
						{trackedSites.map(site => (
							<div
								key={site.id}
								className={styles.siteItem}
							>
								<div>
									<div className={styles.siteName}>
										{site.name || site.url}
										{!site.isActive && (
											<span className={styles.inactiveBadge}>Неактивен</span>
										)}
									</div>
									<div className={styles.siteUrl}>URL: {site.url}</div>
									{site.urlPattern && (
										<div className={styles.sitePattern}>
											Паттерн: {site.urlPattern}
										</div>
									)}
								</div>
								<div className={styles.siteActions}>
									<Tooltip title='Редактировать'>
										<Button
											type='text'
											icon={<EditOutlined />}
											onClick={() => openEditModal(site)}
										/>
									</Tooltip>
									<Tooltip title='Удалить'>
										<Button
											danger
											type='text'
											icon={<DeleteOutlined />}
											onClick={() => void deleteTrackedSite(site.id)}
										/>
									</Tooltip>
								</div>
							</div>
						))}
					</div>
				) : (
					<Empty description='Нет отслеживаемых сайтов' />
				)}
			</Card>

			<SiteModal
				isOpen={isModalOpen}
				onClose={closeModal}
				site={editingSite}
			/>
		</>
	)
}
