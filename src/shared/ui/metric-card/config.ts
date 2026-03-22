import { MetricType } from './types'

export const METRIC_CONFIG: Record<
	MetricType,
	{ label: string; color: string; bg: string }
> = {
	error: { label: 'Error', color: '#ef4444', bg: '#fef2f2' },
	warning: { label: 'Warning', color: '#f59e0b', bg: '#fffbeb' },
	info: { label: 'Info', color: '#3b82f6', bg: '#eff6ff' },
	log: { label: 'Log', color: '#6b7280', bg: '#f9fafb' }
}
