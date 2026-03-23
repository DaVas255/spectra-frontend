import { z } from 'zod'

export const paginationSchema = z.object({
	page: z.number(),
	limit: z.number(),
	total: z.number(),
	totalPages: z.number()
})

export const errorSiteSchema = z.object({
	id: z.number(),
	url: z.string(),
	name: z.string().optional()
})

export const errorSchema = z.object({
	id: z.number(),
	siteId: z.number(),
	fingerprint: z.string(),
	type: z.string(),
	message: z.string(),
	stackTrace: z.string().nullable().optional(),
	fileName: z.string().nullable().optional(),
	lineNumber: z.number().nullable().optional(),
	columnNumber: z.number().nullable().optional(),
	url: z.string(),
	userAgent: z.string().optional(),
	count: z.number(),
	firstSeenAt: z.coerce.date(),
	lastSeenAt: z.coerce.date(),
	lastInstanceId: z.string().optional(),
	site: errorSiteSchema.optional()
})

export const errorsResponseSchema = z.object({
	errors: errorSchema.array(),
	pagination: paginationSchema
})

export type UserError = z.infer<typeof errorSchema>
export type ErrorsResponse = z.infer<typeof errorsResponseSchema>
