// ============================================================
// GET   /api/clients  — List clients (paginated + filtered)
// POST  /api/clients  — Create new client (admin only)
// ============================================================

import { NextRequest } from 'next/server'
import { createClientSchema, listClientsSchema } from '@/lib/validation/schemas'
import { ClientService } from '@/lib/services/client.service'
import { requireManager, requireAdmin } from '@/lib/middleware/auth.middleware'
import {
  successResponse, createdResponse, handleApiError,
} from '@/lib/utils/api.response'

export async function GET(req: NextRequest) {
  try {
    requireManager(req)

    const { searchParams } = new URL(req.url)
    const parsed = listClientsSchema.safeParse(Object.fromEntries(searchParams.entries()))
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await ClientService.listClients(parsed.data)
    return successResponse(result.clients, 200, result.meta)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req)

    const body   = await req.json() as unknown
    const parsed = createClientSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const client = await ClientService.createClient(parsed.data)
    return createdResponse(client)
  } catch (err) {
    return handleApiError(err)
  }
}
