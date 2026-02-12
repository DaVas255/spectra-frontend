import { z } from 'zod'

export const logEntrySchema = z.object({
	id: z.string(),
	level: z.enum(['error', 'warn', 'info', 'debug']),
	message: z.string(),
	source: z.string(),
	timestamp: z.string(),
	metadata: z.record(z.string(), z.unknown()).optional()
})

export const logsResponseSchema = z.object({
	data: z.array(logEntrySchema),
	total: z.number(),
	page: z.number(),
	pageSize: z.number()
})

export type LogEntry = z.infer<typeof logEntrySchema>
export type LogsResponse = z.infer<typeof logsResponseSchema>
