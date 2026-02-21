import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register', '/verify-email']
const authRoutes = ['/login', '/register']
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

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
	const refreshToken = request.cookies.get('refreshToken')?.value

	const isValid = refreshToken ? await isValidRefreshToken(refreshToken) : false

	if (isValid && authRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (publicRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.next()
	}

	if (!isValid) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
