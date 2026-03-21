'use client'

import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Space, Typography } from 'antd'

import { useLogout } from '../../model/useLogout'

import styles from './LogoutMenu.module.scss'
import { useAppSelector } from '@/core/store'
import type { User } from '@/entities/user'

const { Text } = Typography

export const LogoutMenu = () => {
	const { logout, isLogoutLoading } = useLogout()
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
				<Text
					className={styles.email}
					style={{ color: '#fff' }}
				>
					{user.email}
				</Text>
				<DownOutlined className={styles.arrow} />
			</Space>
		</Dropdown>
	)
}
