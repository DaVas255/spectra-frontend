'use client'

import { Spin } from 'antd'

import { AuthFormFooter } from '../AuthFormFooter'
import { AuthFormHeader } from '../AuthFormHeader'

import styles from './Auth.module.scss'
import { useAuthForm } from '@/features/auth'

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
	const { handleSubmit, isAuthFormLoading, onSubmit, register, errors } =
		useAuthForm(isLogin)

	return (
		<div className={styles.authCard}>
			<AuthFormHeader isLogin={isLogin} />

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
					disabled={isAuthFormLoading}
				>
					{isAuthFormLoading ? (
						<Spin size='large' />
					) : isLogin ? (
						'Войти'
					) : (
						'Зарегистрироваться'
					)}
				</button>
			</form>

			<AuthFormFooter isLogin={isLogin} />
		</div>
	)
}
