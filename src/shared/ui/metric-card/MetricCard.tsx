'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import styles from './MetricCard.module.scss'
import { METRIC_CONFIG } from './config'
import { MetricCardProps } from './types'

const formatDate = (date: string | Date) => {
	const d = new Date(date)
	return d.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
}

export const MetricCard = ({
	metric,
	metricType = 'error',
	initiallyExpanded = false
}: MetricCardProps) => {
	const [isExpanded, setIsExpanded] = useState(initiallyExpanded)
	const config = METRIC_CONFIG[metricType]

	const handleToggle = () => {
		setIsExpanded(prev => !prev)
	}

	return (
		<div className={styles.card}>
			<div
				className={styles.header}
				onClick={handleToggle}
				style={{ borderLeftColor: config.color }}
			>
				<div className={styles.headerTop}>
					<span
						className={styles.badge}
						style={{
							color: config.color,
							backgroundColor: config.bg
						}}
					>
						{config.label}
					</span>
					<span className={styles.count}>{metric.count}</span>
				</div>

				<p
					className={clsx(
						styles.message,
						isExpanded && styles.message_expanded
					)}
				>
					{metric.message}
				</p>

				<div className={styles.meta}>
					{metric.site?.name && (
						<span className={styles.site}>{metric.site.name}</span>
					)}
					<span className={styles.date}>{formatDate(metric.lastSeenAt)}</span>
				</div>

				<button className={styles.toggle}>
					{isExpanded ? 'Свернуть' : 'Подробнее'}
				</button>
			</div>

			{isExpanded && (
				<div className={styles.body}>
					{metric.type && (
						<div className={styles.field}>
							<span className={styles.fieldLabel}>Type</span>
							<span className={styles.fieldValue}>{metric.type}</span>
						</div>
					)}

					{metric.url && (
						<div className={styles.field}>
							<span className={styles.fieldLabel}>URL</span>
							<a
								href={metric.url}
								target='_blank'
								rel='noopener noreferrer'
								className={styles.link}
							>
								{metric.url}
							</a>
						</div>
					)}

					{metric.fileName && (
						<div className={styles.field}>
							<span className={styles.fieldLabel}>File</span>
							<span className={styles.fieldValue}>
								{metric.fileName}
								{metric.lineNumber && `:${metric.lineNumber}`}
								{metric.columnNumber && `:${metric.columnNumber}`}
							</span>
						</div>
					)}

					{metric.userAgent && (
						<div className={styles.field}>
							<span className={styles.fieldLabel}>User Agent</span>
							<span className={styles.fieldValue}>{metric.userAgent}</span>
						</div>
					)}

					<div className={styles.field}>
						<span className={styles.fieldLabel}>First seen</span>
						<span className={styles.fieldValue}>
							{formatDate(metric.firstSeenAt)}
						</span>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Last seen</span>
						<span className={styles.fieldValue}>
							{formatDate(metric.lastSeenAt)}
						</span>
					</div>

					{metric.stackTrace && (
						<div className={styles.stackTrace}>
							<span className={styles.fieldLabel}>Stack Trace</span>
							<SyntaxHighlighter
								language='javascript'
								style={vscDarkPlus}
								customStyle={{
									margin: 0,
									borderRadius: '8px',
									fontSize: '12px'
								}}
								wrapLongLines={true}
							>
								{metric.stackTrace}
							</SyntaxHighlighter>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
