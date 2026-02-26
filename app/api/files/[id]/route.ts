// ============================================================
// GET    /api/files/[id]  — Get file metadata
// DELETE /api/files/[id]  — Soft delete file (+ S3 cleanup)
// ============================================================

import { NextRequest } from 'next/server'
import { FileService }  from '@/lib/services/file.service'
import { requireManager, requireAdmin } from '@/lib/middleware/auth.middleware'
import {
  successResponse, noContentResponse, handleApiError,
} from '@/lib/utils/api.response'

interface Params { params: { id: string } }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    requireManager(req)
    const file = await FileService.getFileById(params.id)
    return successResponse(file)
  } catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    await FileService.deleteFile(params.id)
    return noContentResponse()
  } catch (err) {
    return handleApiError(err)
  }
}
