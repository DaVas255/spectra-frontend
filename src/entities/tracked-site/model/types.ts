import { z } from 'zod'

export const trackedSiteSchema = z.object({
	id: z.number(),
	url: z.string(),
	urlPattern: z.string().nullable().optional(),
	name: z.string().nullable().optional(),
	isActive: z.boolean().default(true)
})

export type TrackedSite = z.infer<typeof trackedSiteSchema>
