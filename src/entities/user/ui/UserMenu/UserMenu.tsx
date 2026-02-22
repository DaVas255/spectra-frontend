'use client'

import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Space, Typography } from 'antd'

import styles from './UserMenu.module.scss'
import { useAppSelector } from '@/core/store'
import { User, useUser } from '@/entities/user'

const { Text } = Typography

export const UserMenu = () => {
	const { logout, isLogoutLoading } = useUser()
	const user = useAppSelector((state): User | null => state.user.user)

	if (!user) {
		return null
	}

	const items = [
		{
			key: 'logout',
			label: (
				<Button
					type='text'
					danger
					icon={<LogoutOutlined />}
					onClick={() => logout()}
					loading={isLogoutLoading}
					className={styles.logoutButton}
				>
					Выйти
				</Button>
			)
		}
	]

	return (
		<Dropdown
			menu={{ items }}
			placement='bottomRight'
			arrow
		>
			<Space className={styles.container}>
				<Avatar
					icon={<UserOutlined />}
					className={styles.avatar}
				/>
				<Text className={styles.email}>{user.email}</Text>
				<DownOutlined className={styles.arrow} />
			</Space>
		</Dropdown>
	)
}
