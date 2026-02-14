import { z } from 'zod'

export const authSchema = z.object({
	email: z.email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

export const resendVerificationSchema = z.object({
	email: z.email('Введите корректный email')
})

export const userSchema = z.object({
	id: z.number(),
	email: z.string(),
	createdAt: z.union([z.string(), z.date()]).optional(),
	updatedAt: z.union([z.string(), z.date()]).optional(),
	isEmailVerified: z.boolean()
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
