// ============================================================
// AUTH MIDDLEWARE — Authentication & Authorization Guards
// ============================================================

import type { NextRequest } from 'next/server'
import { getTokenPayload, type JwtPayload } from '@/lib/utils/jwt.util'
import { AppError } from '@/lib/errors/AppError'

export type UserRole = 'admin' | 'manager' | 'staff'

// Role hierarchy (higher number = more privileges)
const ROLE_RANK: Record<UserRole, number> = {
  staff: 1,
  manager: 2,
  admin: 3,
}

/**
 * Authenticate request and return decoded JWT payload.
 */
export function authenticate(req: NextRequest): JwtPayload {
  const payload = getTokenPayload(req)

  if (!payload || !payload.role) {
    throw AppError.unauthorized('Authentication required')
  }

  return payload
}

/**
 * Ensure user has at least one required role.
 */
export function authorize(
  user: JwtPayload,
  allowedRoles: UserRole[]
): void {
  const userRank = ROLE_RANK[user.role as UserRole]

  if (!userRank) {
    throw AppError.forbidden('Invalid user role')
  }

  const hasPermission = allowedRoles.some((role) => {
    return userRank >= ROLE_RANK[role]
  })

  if (!hasPermission) {
    throw AppError.forbidden(
      `Role '${user.role}' does not have permission for this action.`
    )
  }
}

/**
 * Combined guard
 */
export function requireRole(
  req: NextRequest,
  allowedRoles: UserRole[]
): JwtPayload {
  const user = authenticate(req)
  authorize(user, allowedRoles)
  return user
}

/**
 * Admin only
 */
export function requireAdmin(req: NextRequest): JwtPayload {
  return requireRole(req, ['admin'])
}

/**
 * Manager or above
 */
export function requireManager(req: NextRequest): JwtPayload {
  return requireRole(req, ['manager', 'admin'])
}

/**
 * Any authenticated user
 */
export function requireAuth(req: NextRequest): JwtPayload {
  return authenticate(req)
}