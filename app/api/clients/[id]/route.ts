// ============================================================
// GET    /api/clients/[id]  — Get single client
// PATCH  /api/clients/[id]  — Update client
// DELETE /api/clients/[id]  — Soft delete client
// ============================================================

import { NextRequest } from 'next/server'
import { updateClientSchema } from '@/lib/validation/schemas'
import { ClientService } from '@/lib/services/client.service'
import { requireManager, requireAdmin } from '@/lib/middleware/auth.middleware'
import {
  successResponse, noContentResponse, handleApiError,
} from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const client = await ClientService.getClientById(params.id)
    return successResponse(client)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)

    const body   = await req.json() as unknown
    const parsed = updateClientSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const client = await ClientService.updateClient(params.id, parsed.data)
    return successResponse(client)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    await ClientService.deleteClient(params.id)
    return noContentResponse()
  } catch (err) {
    return handleApiError(err)
  }
}
