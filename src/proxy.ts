import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { REFRESH_TOKEN_KEY } from './shared/constants'

const publicRoutes = ['/login', '/register', '/verify-email']
const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
	throw new Error('JWT_SECRET is not set')
}

const JWT_SECRET = new TextEncoder().encode(jwtSecret)

async function isValidRefreshToken(token: string): Promise<boolean> {
	try {
		await jwtVerify(token, JWT_SECRET)
		return true
	} catch {
		return false
	}
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value

	const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
	const isValid = refreshToken ? await isValidRefreshToken(refreshToken) : false

	if (!isValid && !isPublicRoute) {
		request.cookies.delete(REFRESH_TOKEN_KEY)
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isValid && isPublicRoute) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
