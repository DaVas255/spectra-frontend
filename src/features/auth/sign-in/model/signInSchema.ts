import { z } from 'zod'

import { userSchema } from '@/entities/user'

export const signInSchema = z.object({
	email: z.email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

export const signInResponseSchema = z.object({
	user: userSchema,
	accessToken: z.string()
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignInResponse = z.infer<typeof signInResponseSchema>
