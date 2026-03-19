'use client'

import { Spin } from 'antd'
import Link from 'next/link'

import { useSignInForm } from '../../model/useSignInForm'

import styles from './SignInForm.module.scss'

export const SignInForm = () => {
	const { handleSubmit, isSignInLoading, onSubmit, register, errors } =
		useSignInForm()

	return (
		<div className={styles.authCard}>
			<div className={styles.authHeader}>
				<h1 className={styles.authTitle}>Вход в Spectra</h1>
				<p className={styles.authSubtitle}>Введите ваши данные для входа</p>
			</div>

			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.formGroup}>
					<label
						htmlFor='email'
						className={styles.label}
					>
						Email
					</label>
						<input
							type='email'
							id='email'
							autoComplete='email'
							placeholder='your@email.com'
						className={`${styles.input} ${
							errors.email ? styles.inputError : ''
						}`}
						{...register('email')}
					/>
					{errors.email && (
						<span className={styles.errorMessage}>{errors.email.message}</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<label
						htmlFor='password'
						className={styles.label}
					>
						Пароль
					</label>
						<input
							type='password'
							id='password'
							autoComplete='current-password'
							placeholder='••••••'
						className={`${styles.input} ${
							errors.password ? styles.inputError : ''
						}`}
						{...register('password')}
					/>
					{errors.password && (
						<span className={styles.errorMessage}>
							{errors.password.message}
						</span>
					)}
				</div>

				<button
					type='submit'
					className={styles.submitButton}
					disabled={isSignInLoading}
				>
					{isSignInLoading ? <Spin size='large' /> : 'Войти'}
				</button>
			</form>

			<div className={styles.authFooter}>
				<span className={styles.authText}>
					Еще нет аккаунта?{' '}
					<Link
						href='/register'
						className={styles.authLink}
					>
						Зарегистрироваться
					</Link>
				</span>
			</div>
		</div>
	)
}
