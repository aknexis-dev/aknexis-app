// ============================================================
// JWT UTILITIES — Token generation, verification, extraction
// ============================================================

import jwt from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import { AppError } from '@/lib/errors/AppError'
import { AUTH_CONFIG } from '@/lib/config/env.config'

export interface JwtPayload {
  userId: string
  email:  string
  role:   'admin' | 'manager' | 'staff'
  iat?:   number
  exp?:   number
}

export function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, AUTH_CONFIG.jwtSecret, {
    expiresIn: AUTH_CONFIG.jwtExpiresIn,
    algorithm: 'HS256',
  })
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, AUTH_CONFIG.jwtSecret) as JwtPayload
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError('TOKEN_EXPIRED', 'Session has expired. Please sign in again.', 401)
    }
    throw new AppError('TOKEN_INVALID', 'Invalid or tampered token.', 401)
  }
}

export function extractTokenFromRequest(req: NextRequest): string | null {
  // Priority 1: Authorization header (Bearer token)
  const authHeader = req.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  // Priority 2: HTTP-only cookie
  const cookieToken = req.cookies.get(AUTH_CONFIG.cookieName)?.value
  if (cookieToken) return cookieToken

  return null
}

export function getTokenPayload(req: NextRequest): JwtPayload {
  const token = extractTokenFromRequest(req)
  if (!token) throw AppError.unauthorized()
  return verifyToken(token)
}
