import Link from 'next/link'

import styles from './AuthFormFooter.module.scss'

export const AuthFormFooter = ({ isLogin }: { isLogin: boolean }) => {
	return (
		<div className={styles.authFooter}>
			<span className={styles.authText}>
				{isLogin ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}
				<Link
					href={isLogin ? '/register' : '/login'}
					className={styles.authLink}
				>
					{isLogin ? 'Зарегистрироваться' : 'Войти'}
				</Link>
			</span>
		</div>
	)
}
