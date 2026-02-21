interface ZodErrorItem {
	expected?: string
	code?: string
	path?: (string | number)[]
	message?: string
}

interface ZodErrorResponse {
	success?: boolean
	error?: ZodErrorItem[]
	message?: string
}

export const isTechnicalError = (error: unknown): boolean => {
	if (typeof error !== 'object' || error === null) return false

	const err = error as Record<string, unknown>

	if (Array.isArray(err)) {
		return err.every(
			item =>
				typeof item === 'object' &&
				item !== null &&
				('expected' in item || 'code' in item)
		)
	}

	if ('error' in err && Array.isArray(err.error)) {
		return err.error.every(
			item =>
				typeof item === 'object' &&
				item !== null &&
				('expected' in item || 'code' in item)
		)
	}

	return false
}

export const formatApiError = (error: unknown): string => {
	if (isTechnicalError(error)) {
		console.error('Technical error:', error)
		return 'Произошла техническая ошибка. Попробуйте позже.'
	}

	const err = error as Record<string, unknown>

	if (typeof err.message === 'string') {
		return err.message
	}

	const response = err.response as Record<string, unknown> | undefined
	const responseData = response?.data as Record<string, unknown> | undefined

	if (typeof responseData?.message === 'string') {
		return responseData.message
	}

	if (typeof response?.data === 'string') {
		return response.data as string
	}

	console.error('Unknown error:', error)
	return 'Произошла ошибка. Попробуйте позже.'
}
