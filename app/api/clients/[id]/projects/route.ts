// ============================================================
// GET /api/clients/[id]/projects — Get all projects for a client
// ============================================================

import { NextRequest } from 'next/server'
import { ClientService } from '@/lib/services/client.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const projects = await ClientService.getClientProjects(params.id)
    return successResponse(projects)
  } catch (err) {
    return handleApiError(err)
  }
}
