// ============================================================
// ROOT MIDDLEWARE — Admin Route Protection
// Centralized JWT validation
// ============================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenPayload } from '@/lib/utils/jwt.util'

// ------------------------------------------------------------
// Middleware Function
// ------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public admin login route
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    try {
      const payload = getTokenPayload(request)

      // Optional role-based protection example:
      // if (pathname.startsWith('/admin/super') && payload.role !== 'admin') {
      //   return redirectToLogin(request)
      // }

      return NextResponse.next()
    } catch {
      return redirectToLogin(request)
    }
  }

  return NextResponse.next()
}

// ------------------------------------------------------------
// Helper: Redirect to login (safe redirect)
// ------------------------------------------------------------
function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/admin/login', request.url)

  // Optional: preserve intended destination
  loginUrl.searchParams.set('from', request.nextUrl.pathname)

  return NextResponse.redirect(loginUrl)
}

// ------------------------------------------------------------
// Route Matcher
// ------------------------------------------------------------
export const config = {
  matcher: ['/admin/:path*'],
}