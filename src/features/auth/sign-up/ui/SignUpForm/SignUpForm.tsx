'use client'

import { Spin } from 'antd'
import Link from 'next/link'

import { useSignUpForm } from '../../model/useSignUpForm'

import styles from './SignUpForm.module.scss'

export const SignUpForm = () => {
	const { handleSubmit, isSignUpLoading, onSubmit, register, errors } =
		useSignUpForm()

	return (
		<div className={styles.authCard}>
			<div className={styles.authHeader}>
				<h1 className={styles.authTitle}>Регистрация в Spectra</h1>
				<p className={styles.authSubtitle}>
					Создайте аккаунт для начала работы
				</p>
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
					disabled={isSignUpLoading}
				>
					{isSignUpLoading ? <Spin size='large' /> : 'Зарегистрироваться'}
				</button>
			</form>

			<div className={styles.authFooter}>
				<span className={styles.authText}>
					Уже есть аккаунт?{' '}
					<Link
						href='/login'
						className={styles.authLink}
					>
						Войти
					</Link>
				</span>
			</div>
		</div>
	)
}
