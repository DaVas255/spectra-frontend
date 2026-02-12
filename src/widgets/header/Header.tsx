'use client'

import Link from 'next/link'

import styles from './Header.module.scss'
import { useAuth } from '@/features/auth'

export function Header() {
	const { user, isAuthenticated, logout } = useAuth()

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link
					href='/'
					className={styles.logo}
				>
					Spectra
				</Link>

				<nav className={styles.nav}>
					{isAuthenticated && (
						<div className={styles.userSection}>
							<span className={styles.userEmail}>{user?.email}</span>
							<button
								onClick={logout}
								className={styles.logoutButton}
							>
								Выйти
							</button>
						</div>
					)}
				</nav>
			</div>
		</header>
	)
}
