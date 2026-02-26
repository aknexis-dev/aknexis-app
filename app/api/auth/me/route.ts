// ============================================================
// GET /api/auth/me — Get current authenticated user
// Used by the frontend to validate session on load
// ============================================================

import { NextRequest } from 'next/server'
import { AuthService }  from '@/lib/services/auth.service'
import { requireAuth }  from '@/lib/middleware/auth.middleware'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req)
    const user    = await AuthService.getMe(payload.userId)
    return successResponse(user)
  } catch (err) {
    return handleApiError(err)
  }
}
