// ============================================================
// POST /api/leads/[id]/convert — Convert lead to client
// ============================================================

import { NextRequest } from 'next/server'
import { convertLeadSchema } from '@/lib/validation/schemas'
import { LeadService }  from '@/lib/services/lead.service'
import { requireAdmin } from '@/lib/middleware/auth.middleware'
import { createdResponse, handleApiError } from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const user   = requireAdmin(req)
    const body   = await req.json() as unknown
    const parsed = convertLeadSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await LeadService.convertToClient(params.id, parsed.data, user.userId)
    return createdResponse(result, 'Lead successfully converted to client.')
  } catch (err) {
    return handleApiError(err)
  }
}
