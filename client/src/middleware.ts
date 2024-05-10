import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwt'
import { cookies } from 'next/headers'

const publicRoutes = new Set(['/login', '/register', '/', '/about', '/wip'])
const authRoutes = new Set(['/account/profile'])
const roleRoutes: Record<string, Set<string>> = {
	student: new Set([]),
	teacher: new Set([]),
	admin: new Set([]),
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const token = request.cookies.get('scholarToken')
	let decoded: any = verifyToken(token?.value as string)

	if (decoded instanceof Error) {
		decoded = null
	}

	if (decoded && decoded.exp < Date.now() / 1000) {
		cookies().delete('scholarToken')

		return NextResponse.redirect(`/login?redirect=${pathname}`)
	}

	// Check if the route is public
	if (publicRoutes.has(pathname)) {
		console.log('here')
		if (
			decoded &&
			(pathname === '/auth/login' || pathname === '/auth/register')
		) {
			const url = request.nextUrl.clone()
			url.pathname = '/forbidden'
			return NextResponse.rewrite(url)
		}

		return NextResponse.next()
	}

	// Check if the user is authenticated
	if (!decoded) {
		const url = request.nextUrl.clone()
		url.pathname = '/forbidden'
		return NextResponse.rewrite(url)
	}

	const { role } = decoded
	const allowedRoutes = roleRoutes[role] || new Set()

	// Check if the route requires authentication but not a specific role
	if (authRoutes.has(pathname)) {
		return NextResponse.next()
	}

	// Check if the user has access to the requested route based on their role
	if (!allowedRoutes.has(pathname)) {
		const url = request.nextUrl.clone()
		url.pathname = '/forbidden'
		return NextResponse.rewrite(url)
	}

	return NextResponse.next()
}

// Paths to run the middleware on
export const config = {
	matcher: ['/auth/login', '/auth/register', '/account/profile'],
}
