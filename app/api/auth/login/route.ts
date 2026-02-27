// ============================================================
// POST /api/auth/login — Authenticate user, return JWT
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validation/schemas'
import { AuthService } from '@/lib/services/auth.service'
import { rateLimitLogin } from '@/lib/middleware/rate.limit'
import { AUTH_CONFIG, APP_CONFIG } from '@/lib/config/env.config'
import { handleApiError } from '@/lib/utils/api.response'

export async function POST(req: NextRequest) {
  try {
    rateLimitLogin(req)

    const body = await req.json() as unknown
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const { token, user } = await AuthService.login(parsed.data)

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: { user },
        message: 'Login successful.',
      },
      { status: 200 }
    )

    // Set secure HTTP-only cookie
    response.cookies.set(AUTH_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: APP_CONFIG.isProd,
      sameSite: 'lax',
      maxAge: AUTH_CONFIG.cookieMaxAge / 1000,
      path: '/',
    })

    return response
  } catch (err) {
    return handleApiError(err)
  }
}