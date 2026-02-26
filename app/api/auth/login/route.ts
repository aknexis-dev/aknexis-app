// ============================================================
// POST /api/auth/login — Authenticate user, return JWT
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { loginSchema }   from '@/lib/validation/schemas'
import { AuthService }   from '@/lib/services/auth.service'
import { rateLimitLogin } from '@/lib/middleware/rate.limit'
import { AUTH_CONFIG }   from '@/lib/config/env.config'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

export async function POST(req: NextRequest) {
  try {
    rateLimitLogin(req)

    const body   = await req.json() as unknown
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const { token, user } = await AuthService.login(parsed.data)

    // Set HTTP-only cookie for browser sessions
    const res = successResponse(
      { user },
      200,
      undefined,
      'Login successful.'
    )

    const response = new NextResponse(await res.text(), {
      status:  200,
      headers: { 'Content-Type': 'application/json' },
    })

    response.cookies.set(AUTH_CONFIG.cookieName, token, {
      httpOnly:  true,
      secure:    process.env.NODE_ENV === 'production',
      sameSite:  'lax',
      maxAge:    AUTH_CONFIG.cookieMaxAge / 1000,
      path:      '/',
    })

    return response
  } catch (err) {
    return handleApiError(err)
  }
}
