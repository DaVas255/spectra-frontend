import { z } from 'zod'

import { userSchema } from '@/entities/user'

export const authSchema = z.object({
	email: z.email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

export const resendVerificationSchema = z.object({
	email: z.email('Введите корректный email')
})

export const authResponseSchema = z.object({
	user: userSchema,
	accessToken: z.string()
})

export const registerResponseSchema = z.object({
	user: userSchema,
	message: z.string()
})

export type AuthInput = z.infer<typeof authSchema>
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>
export type User = z.infer<typeof userSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type RegisterResponse = z.infer<typeof registerResponseSchema>
