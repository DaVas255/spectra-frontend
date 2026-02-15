import { z } from 'zod'

export const userSchema = z.object({
	id: z.number(),
	email: z.string(),
	createdAt: z.union([z.string(), z.date()]).optional(),
	updatedAt: z.union([z.string(), z.date()]).optional(),
	isEmailVerified: z.boolean()
})

export type User = z.infer<typeof userSchema>
