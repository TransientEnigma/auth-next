import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // find the path
    const path = request.nextUrl.pathname;

    // match the path we want
    const isPublicPath = (path === '/login') || (path === '/signup') || (path === '/verifyemail');

    // extract the token (might not be there so ?)
    const token = request.cookies.get('token')?.value || '';

    // if public path and token - don't allow login or signup
    if (isPublicPath && token) {

        // redirect authenticated users, there are other ways to redirect, this is one
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // if no public path or token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}