import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register', '/verify-email']
const authRoutes = ['/login', '/register']

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const token = request.cookies.get('refreshToken')?.value

	if (publicRoutes.some(route => pathname.startsWith(route))) {
		if (token && authRoutes.some(route => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return NextResponse.next()
	}

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
