// ============================================================
// FILE MODEL — Uploaded documents, contracts, assets
// Files are stored in S3/R2; only metadata lives in MongoDB
// ============================================================

import mongoose, { Schema, type Document, type Model } from 'mongoose'

// ── Enums ─────────────────────────────────────────────────────
export const FILE_CATEGORIES  = ['contract', 'proposal', 'report', 'design', 'deliverable', 'invoice', 'other'] as const
export const ACCESS_LEVELS    = ['internal', 'client_visible'] as const

export type FileCategory = typeof FILE_CATEGORIES[number]
export type AccessLevel  = typeof ACCESS_LEVELS[number]

// ── Document Interface ────────────────────────────────────────
export interface IFile extends Document {
  _id:          mongoose.Types.ObjectId
  originalName: string     // Original filename as uploaded
  storageKey:   string     // S3/R2 object key — unique
  mimeType:     string
  sizeBytes:    number
  extension:    string
  category:     FileCategory
  clientId?:    mongoose.Types.ObjectId
  projectId?:   mongoose.Types.ObjectId
  accessLevel:  AccessLevel
  description?: string
  uploadedBy:   mongoose.Types.ObjectId
  tags:         string[]
  isArchived:   boolean
  deletedAt?:   Date
  createdAt:    Date
  updatedAt:    Date
}

// ── Schema ────────────────────────────────────────────────────
const FileSchema = new Schema<IFile>(
  {
    originalName: { type: String, required: true, trim: true, maxlength: 255 },
    storageKey:   { type: String, required: true, unique: true, trim: true },
    mimeType:     { type: String, required: true, trim: true, maxlength: 100 },
    sizeBytes:    { type: Number, required: true, min: 0 },
    extension:    { type: String, required: true, trim: true, lowercase: true, maxlength: 20 },
    category:     { type: String, enum: FILE_CATEGORIES, required: true },
    clientId:     { type: Schema.Types.ObjectId, ref: 'Client', index: true },
    projectId:    { type: Schema.Types.ObjectId, ref: 'Project', index: true },
    accessLevel:  { type: String, enum: ACCESS_LEVELS, default: 'internal' },
    description:  { type: String, trim: true, maxlength: 500 },
    uploadedBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tags:         { type: [String], default: [] },
    isArchived:   { type: Boolean, default: false, index: true },
    deletedAt:    { type: Date, index: true },
  },
  {
    timestamps: true,
    toJSON:     {
      virtuals: true,
      transform: (_doc, ret) => { const { __v, ...rest } = ret; return rest },
    },
    toObject: { virtuals: true },
  }
)

// ── Indexes ───────────────────────────────────────────────────
FileSchema.index({ storageKey: 1 }, { unique: true })
FileSchema.index({ clientId: 1, category: 1 })
FileSchema.index({ projectId: 1, category: 1 })
FileSchema.index({ uploadedBy: 1 })
FileSchema.index({ deletedAt: 1 })

// ── Virtuals ──────────────────────────────────────────────────
FileSchema.virtual('sizeMB').get(function (this: IFile): string {
  return (this.sizeBytes / (1024 * 1024)).toFixed(1) + ' MB'
})

// ── Model ─────────────────────────────────────────────────────
export const File: Model<IFile> =
  mongoose.models.File ?? mongoose.model<IFile>('File', FileSchema)
