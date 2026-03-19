'use client'

import Link from 'next/link'

import styles from './Header.module.scss'
import { useAppSelector } from '@/core/store'
import type { User } from '@/entities/user'
import { LogoutMenu } from '@/features/auth/logout'

export function Header() {
	const user = useAppSelector((state): User | null => state.user.user)

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link
					href='/'
					className={styles.logo}
				>
					Spectra
				</Link>

				<nav className={styles.nav}>{user && <LogoutMenu />}</nav>
			</div>
		</header>
	)
}
