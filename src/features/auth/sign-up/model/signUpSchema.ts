import { z } from 'zod'

import { userSchema } from '@/entities/user'

export const signUpSchema = z.object({
	email: z.email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

export const signUpResponseSchema = z.object({
	user: userSchema,
	message: z.string()
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignUpResponse = z.infer<typeof signUpResponseSchema>
