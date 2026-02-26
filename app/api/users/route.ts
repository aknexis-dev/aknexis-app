// ============================================================
// GET   /api/users  — List platform users (admin only)
// POST  /api/users  — Create new internal user (admin only)
// ============================================================

import { NextRequest } from 'next/server'
import { createUserSchema } from '@/lib/validation/schemas'
import { UserService }  from '@/lib/services/auth.service'
import { requireAdmin } from '@/lib/middleware/auth.middleware'
import {
  successResponse, createdResponse, handleApiError,
} from '@/lib/utils/api.response'

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req)

    const { searchParams } = new URL(req.url)
    const page  = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(100, parseInt(searchParams.get('limit') ?? '20', 10))

    const result = await UserService.listUsers(page, limit)
    return successResponse(result.users, 200, result.meta)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req)

    const body   = await req.json() as unknown
    const parsed = createUserSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const user = await UserService.createUser(parsed.data)
    return createdResponse(user)
  } catch (err) {
    return handleApiError(err)
  }
}
