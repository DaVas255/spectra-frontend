import { z } from 'zod'

export const resendVerificationSchema = z.object({
	email: z.email('Введите корректный email')
})

export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>
