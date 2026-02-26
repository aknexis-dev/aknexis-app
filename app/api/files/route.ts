// ============================================================
// GET   /api/files         — List files (paginated + filtered)
// POST  /api/files/upload  — Request presigned S3 upload URL
// POST  /api/files         — Register file after S3 upload
// ============================================================

import { NextRequest } from 'next/server'
import { registerFileSchema, listFilesSchema } from '@/lib/validation/schemas'
import { FileService }  from '@/lib/services/file.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import {
  successResponse, createdResponse, handleApiError,
} from '@/lib/utils/api.response'

// GET /api/files
export async function GET(req: NextRequest) {
  try {
    requireManager(req)

    const { searchParams } = new URL(req.url)
    const parsed = listFilesSchema.safeParse(Object.fromEntries(searchParams.entries()))
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await FileService.listFiles(parsed.data)
    return successResponse(result.files, 200, result.meta)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/files — Register file metadata after direct S3 upload
export async function POST(req: NextRequest) {
  try {
    const user   = requireManager(req)
    const body   = await req.json() as unknown
    const parsed = registerFileSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const file = await FileService.registerFile(parsed.data, user.userId)
    return createdResponse(file)
  } catch (err) {
    return handleApiError(err)
  }
}
