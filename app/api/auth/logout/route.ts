// ============================================================
// POST /api/auth/logout — Clear session cookie
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { AUTH_CONFIG } from '@/lib/config/env.config'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

export async function POST(req: NextRequest) {
  try {
    const res = successResponse(null, 200, undefined, 'Logged out successfully.')

    const response = new NextResponse(await res.text(), {
      status:  200,
      headers: { 'Content-Type': 'application/json' },
    })

    // Clear the session cookie
    response.cookies.set(AUTH_CONFIG.cookieName, '', {
      httpOnly:  true,
      secure:    process.env.NODE_ENV === 'production',
      sameSite:  'lax',
      maxAge:    0, // Expire immediately
      path:      '/',
    })

    return response
  } catch (err) {
    return handleApiError(err)
  }
}
