import styles from './AuthFormHeader.module.scss'

export const AuthFormHeader = ({ isLogin }: { isLogin: boolean }) => {
	return (
		<div className={styles.authHeader}>
			<h1 className={styles.authTitle}>
				{isLogin ? 'Вход в Spectra' : 'Регистрация в Spectra'}
			</h1>
			<p className={styles.authSubtitle}>
				{isLogin
					? 'Введите ваши данные для входа'
					: 'Создайте аккаунт для начала работы'}
			</p>
		</div>
	)
}
