// ============================================================
// FILE SERVICE — S3/R2 storage + metadata in MongoDB
// Upload flow: request presigned URL → upload to S3 → register
// ============================================================

import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl }    from '@aws-sdk/s3-request-presigner'
import { connectDB }       from '@/lib/db/connection'
import { File }            from '@/lib/db/index'
import { AppError }        from '@/lib/errors/AppError'
import { validateObjectId } from '@/lib/utils/id.util'
import { buildPaginationMeta } from '@/lib/utils/service.util'
import { STORAGE_CONFIG }  from '@/lib/config/env.config'
import type {
  RequestUploadUrlInput,
  RegisterFileInput,
  ListFilesInput,
} from '@/lib/validation/schemas'
import type { IFile } from '@/lib/db/models/File.model'
import crypto from 'crypto'
import path   from 'path'
import mongoose from 'mongoose'

// ── Allowed MIME types ────────────────────────────────────────
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/zip',
])

// ── S3 Client (lazy-initialized) ──────────────────────────────
let s3Client: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: STORAGE_CONFIG.region,
      credentials: {
        accessKeyId:     STORAGE_CONFIG.accessKeyId,
        secretAccessKey: STORAGE_CONFIG.secretAccessKey,
      },
    })
  }
  return s3Client
}

export class FileService {
  // ── Request presigned upload URL ───────────────────────────

  static async requestUploadUrl(
    input:  RequestUploadUrlInput,
    userId: string
  ): Promise<{ uploadUrl: string; storageKey: string; expiresAt: Date }> {
    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(input.mimeType)) {
      throw new AppError(
        'INVALID_FILE_TYPE',
        `File type '${input.mimeType}' is not allowed.`,
        400
      )
    }

    // Validate file size (50 MB)
    const maxBytes = STORAGE_CONFIG.maxFileSizeMB * 1024 * 1024
    if (input.sizeBytes > maxBytes) {
      throw new AppError(
        'FILE_TOO_LARGE',
        `File size exceeds the maximum allowed size of ${STORAGE_CONFIG.maxFileSizeMB} MB.`,
        400
      )
    }

    // Generate unique storage key
    const ext        = path.extname(input.originalName).toLowerCase()
    const uniqueId   = crypto.randomBytes(16).toString('hex')
    const datePrefix = new Date().toISOString().split('T')[0].replace(/-/g, '/')
    const storageKey = `uploads/${datePrefix}/${uniqueId}${ext}`

    // Generate presigned PUT URL
    const command = new PutObjectCommand({
      Bucket:      STORAGE_CONFIG.bucketName,
      Key:         storageKey,
      ContentType: input.mimeType,
      ContentLength: input.sizeBytes,
      Metadata: {
        userId,
        originalName: encodeURIComponent(input.originalName),
      },
    })

    const s3      = getS3Client()
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: STORAGE_CONFIG.signedUrlExpiry,
    })

    const expiresAt = new Date(Date.now() + STORAGE_CONFIG.signedUrlExpiry * 1000)

    return { uploadUrl, storageKey, expiresAt }
  }

  // ── Register file after successful upload ──────────────────

  static async registerFile(
    input:  RegisterFileInput,
    userId: string
  ): Promise<IFile> {
    await connectDB()

    if (input.clientId)  validateObjectId(input.clientId, 'clientId')
    if (input.projectId) validateObjectId(input.projectId, 'projectId')

    // Prevent duplicate registration of same storageKey
    const existing = await File.findOne({ storageKey: input.storageKey })
    if (existing) {
      throw AppError.conflict('A file with this storage key has already been registered.')
    }

    const file = await File.create({
      ...input,
      uploadedBy: new mongoose.Types.ObjectId(userId),
      isArchived: false,
    })

    return file
  }

  // ── List ───────────────────────────────────────────────────

  static async listFiles(input: ListFilesInput) {
    await connectDB()

    const { page, limit, clientId, projectId, category, isArchived, sortBy, sortOrder } = input
    const skip = (page - 1) * limit

    const filter: mongoose.FilterQuery<IFile> = {
      deletedAt: null,
      isArchived,
    }

    if (clientId) {
      validateObjectId(clientId, 'clientId')
      filter.clientId = clientId
    }
    if (projectId) {
      validateObjectId(projectId, 'projectId')
      filter.projectId = projectId
    }
    if (category) filter.category = category

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }

    const [files, total] = await Promise.all([
      File.find(filter)
        .populate('uploadedBy', 'firstName lastName email')
        .populate('clientId', 'companyName')
        .populate('projectId', 'title')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      File.countDocuments(filter),
    ])

    return { files, meta: buildPaginationMeta(total, page, limit) }
  }

  // ── Get one ────────────────────────────────────────────────

  static async getFileById(id: string): Promise<IFile> {
    await connectDB()
    validateObjectId(id)

    const file = await File.findOne({ _id: id, deletedAt: null })
      .populate('uploadedBy', 'firstName lastName email')
      .populate('clientId', 'companyName')
      .populate('projectId', 'title')

    if (!file) throw AppError.notFound('File')
    return file
  }

  // ── Generate presigned download URL ───────────────────────

  static async getDownloadUrl(id: string): Promise<{ downloadUrl: string; expiresAt: Date }> {
    await connectDB()

    const file = await this.getFileById(id)

    const command = new GetObjectCommand({
      Bucket: STORAGE_CONFIG.bucketName,
      Key:    file.storageKey,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(file.originalName)}"`,
    })

    const s3 = getS3Client()
    const downloadUrl = await getSignedUrl(s3, command, {
      expiresIn: STORAGE_CONFIG.signedUrlExpiry,
    })

    const expiresAt = new Date(Date.now() + STORAGE_CONFIG.signedUrlExpiry * 1000)
    return { downloadUrl, expiresAt }
  }

  // ── Archive / unarchive ────────────────────────────────────

  static async setArchived(id: string, isArchived: boolean): Promise<IFile> {
    await connectDB()
    validateObjectId(id)

    const file = await File.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { isArchived },
      { new: true }
    )

    if (!file) throw AppError.notFound('File')
    return file
  }

  // ── Soft delete (metadata only; S3 object can be cleaned up separately) ──

  static async deleteFile(id: string): Promise<void> {
    await connectDB()
    validateObjectId(id)

    const result = await File.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }
    )

    if (!result) throw AppError.notFound('File')

    // Optionally delete from S3 as well
    try {
      const s3 = getS3Client()
      await s3.send(new DeleteObjectCommand({
        Bucket: STORAGE_CONFIG.bucketName,
        Key:    result.storageKey,
      }))
    } catch (err) {
      // Log but don't fail — metadata deletion is the critical step
      console.error('[FileService] S3 delete failed:', err)
    }
  }

  // ── Stats ─────────────────────────────────────────────────

  static async getFileStats() {
    await connectDB()

    const [total, byCategory, totalBytes] = await Promise.all([
      File.countDocuments({ deletedAt: null, isArchived: false }),
      File.aggregate([
        { $match: { deletedAt: null, isArchived: false } },
        { $group: { _id: '$category', count: { $sum: 1 }, sizeBytes: { $sum: '$sizeBytes' } } },
      ]),
      File.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: null, total: { $sum: '$sizeBytes' } } },
      ]),
    ])

    const categoryMap: Record<string, { count: number; sizeBytes: number }> = {}
    byCategory.forEach((c: { _id: string; count: number; sizeBytes: number }) => {
      categoryMap[c._id] = { count: c.count, sizeBytes: c.sizeBytes }
    })

    const totalStorageBytes = (totalBytes[0] as { total?: number } | undefined)?.total ?? 0

    return { total, byCategory: categoryMap, totalStorageBytes }
  }
}
