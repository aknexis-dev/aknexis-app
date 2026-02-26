// ============================================================
// GET /api/dashboard — Aggregate stats for admin overview
// ============================================================

import { NextRequest } from 'next/server'
import { DashboardService } from '@/lib/services/dashboard.service'
import { requireManager }   from '@/lib/middleware/auth.middleware'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

export async function GET(req: NextRequest) {
  try {
    requireManager(req)
    const stats = await DashboardService.getStats()
    return successResponse(stats)
  } catch (err) {
    return handleApiError(err)
  }
}
