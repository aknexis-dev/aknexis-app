// ============================================================
// GET    /api/leads/[id]  — Get single lead
// PATCH  /api/leads/[id]  — Update lead status/assignment
// DELETE /api/leads/[id]  — Soft delete lead
// ============================================================

import { NextRequest } from 'next/server'
import { updateLeadSchema, addLeadNoteSchema } from '@/lib/validation/schemas'
import { LeadService }    from '@/lib/services/lead.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import {
  successResponse, noContentResponse, handleApiError,
} from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const lead = await LeadService.getLeadById(params.id)
    return successResponse(lead)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)

    const body   = await req.json() as unknown
    const parsed = updateLeadSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const lead = await LeadService.updateLead(params.id, parsed.data)
    return successResponse(lead, 200)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    await LeadService.deleteLead(params.id)
    return noContentResponse()
  } catch (err) {
    return handleApiError(err)
  }
}
