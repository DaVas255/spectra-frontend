'use client'

import Link from 'next/link'

import styles from './Header.module.scss'
import { useAppSelector } from '@/core/store'
import { User, UserMenu } from '@/entities/user'

export function Header() {
	const user = useAppSelector((state): User | null => state.auth.user)

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link
					href='/'
					className={styles.logo}
				>
					Spectra
				</Link>

				<nav className={styles.nav}>{user && <UserMenu />}</nav>
			</div>
		</header>
	)
}
