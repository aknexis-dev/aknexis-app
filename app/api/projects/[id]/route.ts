// ============================================================
// GET    /api/projects/[id]  — Get single project
// PATCH  /api/projects/[id]  — Update project
// DELETE /api/projects/[id]  — Soft delete project
// ============================================================

import { NextRequest } from 'next/server'
import { updateProjectSchema } from '@/lib/validation/schemas'
import { ProjectService } from '@/lib/services/project.service'
import { requireManager, requireAdmin } from '@/lib/middleware/auth.middleware'
import {
  successResponse, noContentResponse, handleApiError,
} from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const project = await ProjectService.getProjectById(params.id)
    return successResponse(project)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)

    const body   = await req.json() as unknown
    const parsed = updateProjectSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const project = await ProjectService.updateProject(params.id, parsed.data)
    return successResponse(project)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    await ProjectService.deleteProject(params.id)
    return noContentResponse()
  } catch (err) {
    return handleApiError(err)
  }
}
