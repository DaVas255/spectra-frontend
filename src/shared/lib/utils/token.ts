import { ACCESS_TOKEN_KEY, IS_CLIENT, IS_SERVER } from '@/shared/constants'

export const tokenService = {
	getAccessToken: (): string | null => {
		if (IS_SERVER) return null
		return localStorage.getItem(ACCESS_TOKEN_KEY)
	},

	setAccessToken: (token: string): void => {
		if (IS_SERVER) return
		localStorage.setItem(ACCESS_TOKEN_KEY, token)
	},

	removeAccessToken: (): void => {
		if (IS_SERVER) return
		localStorage.removeItem(ACCESS_TOKEN_KEY)
	}
}
