// ============================================================
// POST   /api/leads  — Public lead submission from website
// GET    /api/leads  — Admin: list all leads (paginated)
// ============================================================

import { NextRequest } from 'next/server'
import { createLeadSchema, listLeadsSchema } from '@/lib/validation/schemas'
import { LeadService }    from '@/lib/services/lead.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import { rateLimitLeadSubmission } from '@/lib/middleware/rate.limit'
import {
  successResponse, createdResponse,
  handleApiError,
} from '@/lib/utils/api.response'

// ── POST /api/leads ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    rateLimitLeadSubmission(req)

    const body   = await req.json() as unknown
    const parsed = createLeadSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const lead = await LeadService.createLead(parsed.data)
    return createdResponse(lead, 'Your inquiry has been received. We will be in touch shortly.')
  } catch (err) {
    return handleApiError(err)
  }
}

// ── GET /api/leads ────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const user = requireManager(req)
    void user

    const { searchParams } = new URL(req.url)
    const parsed = listLeadsSchema.safeParse(Object.fromEntries(searchParams.entries()))
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await LeadService.listLeads(parsed.data)
    return successResponse(result.leads, 200, result.meta)
  } catch (err) {
    return handleApiError(err)
  }
}
