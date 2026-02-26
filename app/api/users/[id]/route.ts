// ============================================================
// GET    /api/users/[id]  — Get single user
// PATCH  /api/users/[id]  — Update user role/status
// DELETE /api/users/[id]  — Soft delete user
// ============================================================

import { NextRequest } from 'next/server'
import { updateUserSchema } from '@/lib/validation/schemas'
import { UserService }  from '@/lib/services/auth.service'
import { requireAdmin } from '@/lib/middleware/auth.middleware'
import { AppError }     from '@/lib/errors/AppError'
import {
  successResponse, noContentResponse, handleApiError,
} from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    const user = await UserService.getUserById(params.id)
    return successResponse(user)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const currentUser = requireAdmin(req)

    const body   = await req.json() as unknown
    const parsed = updateUserSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    // Prevent self-demotion
    if (params.id === currentUser.userId && parsed.data.role && parsed.data.role !== 'admin') {
      throw new AppError('FORBIDDEN', 'You cannot change your own role.', 403)
    }

    const user = await UserService.updateUser(params.id, parsed.data)
    return successResponse(user)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const currentUser = requireAdmin(req)

    // Prevent self-deletion
    if (params.id === currentUser.userId) {
      throw new AppError('FORBIDDEN', 'You cannot delete your own account.', 403)
    }

    await UserService.deleteUser(params.id)
    return noContentResponse()
  } catch (err) {
    return handleApiError(err)
  }
}
