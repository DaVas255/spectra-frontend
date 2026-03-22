export type MetricType = 'error' | 'warning' | 'info' | 'log'

interface CommonMetric {
	id: number
	siteId: number
	message: string
	url: string
	count: number
	firstSeenAt: string | Date
	lastSeenAt: string | Date
	site?: {
		id: number
		url: string
		name?: string
	}
}

interface ErrorMetric extends CommonMetric {
	stackTrace?: string | null
	fileName?: string | null
	lineNumber?: number | null
	columnNumber?: number | null
	type?: string | null
	userAgent?: string | null
}

export type MetricCardProps = {
	metric: ErrorMetric
	metricType?: MetricType
	initiallyExpanded?: boolean
}
