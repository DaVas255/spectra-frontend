import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register', '/verify-email']
const authRoutes = ['/login', '/register']

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const hasRefreshToken = request.cookies.has('refreshToken')

	if (hasRefreshToken && authRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (publicRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.next()
	}

	if (!hasRefreshToken) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
