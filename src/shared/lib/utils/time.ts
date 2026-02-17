/**
 * Форматирует секунды в строку формата MM:SS
 * @param seconds - количество секунд
 * @returns строка в формате "M:SS" или "MM:SS"
 * @example
 * formatTime(65) // "1:05"
 * formatTime(125) // "2:05"
 * formatTime(0) // "0:00"
 */
export const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60)
	const secs = seconds % 60
	return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Форматирует секунды в строку с часами
 * @param seconds - количество секунд
 * @returns строка в формате "H:MM:SS" или "HH:MM:SS"
 * @example
 * formatTimeLong(3665) // "1:01:05"
 * formatTimeLong(0) // "0:00:00"
 */
export const formatTimeLong = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Преобразует миллисекунды в секунды
 * @param ms - миллисекунды
 * @returns секунды
 */
export const msToSeconds = (ms: number): number => Math.floor(ms / 1000)

/**
 * Преобразует секунды в миллисекунды
 * @param seconds - секунды
 * @returns миллисекунды
 */
export const secondsToMs = (seconds: number): number => seconds * 1000
