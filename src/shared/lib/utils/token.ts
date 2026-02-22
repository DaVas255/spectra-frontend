let accessTokenMemory: string | null = null

export const tokenService = {
	getAccessToken: () => accessTokenMemory,
	setAccessToken: (token: string) => {
		accessTokenMemory = token
	},
	removeAccessToken: () => {
		accessTokenMemory = null
	}
}
