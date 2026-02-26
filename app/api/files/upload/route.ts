// ============================================================
// POST /api/files/upload — Request presigned S3 PUT URL
// Step 1 of 2 in the upload flow:
//   1. POST here to get presigned URL
//   2. PUT file directly to S3 using the URL
//   3. POST /api/files to register metadata
// ============================================================

import { NextRequest } from 'next/server'
import { requestUploadUrlSchema } from '@/lib/validation/schemas'
import { FileService }    from '@/lib/services/file.service'
import { requireManager } from '@/lib/middleware/auth.middleware'
import { successResponse, handleApiError } from '@/lib/utils/api.response'

export async function POST(req: NextRequest) {
  try {
    const user   = requireManager(req)
    const body   = await req.json() as unknown
    const parsed = requestUploadUrlSchema.safeParse(body)
    if (!parsed.success) return handleApiError(parsed.error)

    const result = await FileService.requestUploadUrl(parsed.data, user.userId)

    return successResponse(result, 200, undefined, 'Presigned upload URL generated.')
  } catch (err) {
    return handleApiError(err)
  }
}
