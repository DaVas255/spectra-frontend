import { useEffect, useRef, useState } from 'react'

interface UseTimerOptions {
	seconds: number
	onComplete?: () => void
	autoStart?: boolean
}

export const useTimer = ({ seconds, onComplete, autoStart = false }: UseTimerOptions) => {
	const [timeLeft, setTimeLeft] = useState(autoStart ? seconds : 0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const clear = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}

	const start = () => {
		clear()
		setTimeLeft(seconds)

		intervalRef.current = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					clear()
					onComplete?.()
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}

	const reset = () => {
		clear()
		setTimeLeft(0)
	}

	useEffect(() => {
		if (autoStart) {
			start()
		}
		return () => clear()
	}, [])

	return {
		timeLeft,
		isRunning: timeLeft > 0,
		start,
		reset
	}
}
