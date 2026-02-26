// ============================================================
// GET   /api/projects  — List projects (paginated + filtered)
// POST  /api/projects  — Create new project
// ============================================================

import { NextRequest } from 'next/server'
import { createProjectSchema, listProjectsSchema } from '@/lib/validation/schemas'
import { ProjectService } from '@/lib/services/project.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import {
  successResponse, createdResponse, handleApiError,
} from '@/lib/utils/api.response'

export async function GET(req: NextRequest) {
  try {
    requireManager(req)

    const { searchParams } = new URL(req.url)
    const parsed = listProjectsSchema.safeParse(Object.fromEntries(searchParams.entries()))
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await ProjectService.listProjects(parsed.data)
    return successResponse(result.projects, 200, result.meta)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function POST(req: NextRequest) {
  try {
    requireManager(req)

    const body   = await req.json() as unknown
    const parsed = createProjectSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const project = await ProjectService.createProject(parsed.data)
    return createdResponse(project)
  } catch (err) {
    return handleApiError(err)
  }
}
