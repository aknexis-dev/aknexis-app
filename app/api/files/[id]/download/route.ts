// ============================================================
// GET /api/files/[id]/download — Get presigned S3 download URL
// Returns a time-limited signed URL for secure file access.
// Never exposes the raw S3 URL directly.
// ============================================================

import { NextRequest } from 'next/server'
import { FileService }  from '@/lib/services/file.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const result = await FileService.getDownloadUrl(params.id)
    return successResponse(result, 200, undefined, 'Download URL generated.')
  } catch (err) {
    return handleApiError(err)
  }
}
