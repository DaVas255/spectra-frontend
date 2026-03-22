import { z } from 'zod'

export const createTrackedSiteSchema = z.object({
	url: z.string(),
	urlPattern: z.string().optional(),
	name: z.string().optional(),
	isActive: z.boolean().optional()
})

export type CreateTrackedSite = z.infer<typeof createTrackedSiteSchema>
