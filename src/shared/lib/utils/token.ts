import { ACCESS_TOKEN_KEY, IS_CLIENT } from '@/shared/constants'

export const tokenService = {
	getAccessToken: (): string | null => {
		if (!IS_CLIENT) return null
		return localStorage.getItem(ACCESS_TOKEN_KEY)
	},

	setAccessToken: (token: string): void => {
		if (!IS_CLIENT) return
		localStorage.setItem(ACCESS_TOKEN_KEY, token)
	},

	removeAccessToken: (): void => {
		if (!IS_CLIENT) return
		localStorage.removeItem(ACCESS_TOKEN_KEY)
	}
}
