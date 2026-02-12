import Link from 'next/link'

import styles from './not-found.module.scss'

export const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.errorCode}>404</div>
				<h1 className={styles.title}>Страница не найдена</h1>
				<p className={styles.description}>
					Извините, но запрашиваемая страница не существует или была удалена.
				</p>
				<Link
					href='/'
					className={styles.homeButton}
				>
					Вернуться на главную
				</Link>
			</div>
		</div>
	)
}
