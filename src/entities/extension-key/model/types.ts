import { z } from 'zod'

export const extensionKeySchema = z.object({
	id: z.uuid(),
	key: z.string().startsWith('sk_live_', 'Неверный формат ключа'),
	userId: z.number(),
	name: z.string().nullable(),
	isActive: z.boolean(),
	lastUsed: z.string().nullable(),
	createdAt: z.string()
})

export type ExtensionKey = z.infer<typeof extensionKeySchema>
