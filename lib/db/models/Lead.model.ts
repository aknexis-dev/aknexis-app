// ============================================================
// LEAD MODEL — Website inquiry captures
// First touchpoint in the client acquisition lifecycle
// ============================================================

import mongoose, { Schema, type Document, type Model } from 'mongoose'

// ── Enums ─────────────────────────────────────────────────────
export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'proposal_sent',
  'converted',
  'lost',
  'spam',
] as const

export const SERVICE_INTERESTS = [
  'software_engineering',
  'growth_intelligence',
  'business_foundation',
  'not_sure',
] as const

export const LEAD_SOURCES = [
  'website_contact',
  'website_service',
  'referral',
  'linkedin',
  'conference',
  'cold_outreach',
  'other',
] as const

export type LeadStatus      = typeof LEAD_STATUSES[number]
export type ServiceInterest = typeof SERVICE_INTERESTS[number]
export type LeadSource      = typeof LEAD_SOURCES[number]

// ── Note subdocument ──────────────────────────────────────────
export interface ILeadNote {
  _id:       mongoose.Types.ObjectId
  content:   string
  addedBy:   mongoose.Types.ObjectId
  createdAt: Date
}

// ── Document Interface ────────────────────────────────────────
export interface ILead extends Document {
  _id:                 mongoose.Types.ObjectId
  fullName:            string
  email:               string
  phone?:              string
  companyName:         string
  jobTitle?:           string
  serviceInterest:     ServiceInterest
  message:             string
  status:              LeadStatus
  source:              LeadSource
  assignedTo?:         mongoose.Types.ObjectId
  notes:               ILeadNote[]
  convertedToClientId?: mongoose.Types.ObjectId
  // UTM / marketing attribution (future)
  utmSource?:          string
  utmMedium?:          string
  utmCampaign?:        string
  // Soft delete
  deletedAt?:          Date
  createdAt:           Date
  updatedAt:           Date
}

// ── Schema ────────────────────────────────────────────────────
const NoteSchema = new Schema<ILeadNote>(
  {
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const LeadSchema = new Schema<ILead>(
  {
    fullName:        { type: String, required: true, trim: true, maxlength: 100 },
    email:           {
      type:      String,
      required:  true,
      trim:      true,
      lowercase: true,
      maxlength: 254,
      match:     [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    phone:           { type: String, trim: true, maxlength: 30 },
    companyName:     { type: String, required: true, trim: true, maxlength: 200 },
    jobTitle:        { type: String, trim: true, maxlength: 100 },
    serviceInterest: { type: String, enum: SERVICE_INTERESTS, required: true },
    message:         { type: String, required: true, trim: true, maxlength: 2000 },
    status:          { type: String, enum: LEAD_STATUSES, default: 'new', index: true },
    source:          { type: String, enum: LEAD_SOURCES, default: 'website_contact' },
    assignedTo:      { type: Schema.Types.ObjectId, ref: 'User', index: true },
    notes:           { type: [NoteSchema], default: [] },
    convertedToClientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    // UTM tracking
    utmSource:   { type: String, trim: true },
    utmMedium:   { type: String, trim: true },
    utmCampaign: { type: String, trim: true },
    // Soft delete
    deletedAt:   { type: Date, index: true },
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
LeadSchema.index({ email: 1 })
LeadSchema.index({ status: 1, createdAt: -1 })
LeadSchema.index({ serviceInterest: 1 })
LeadSchema.index({ assignedTo: 1, status: 1 })
LeadSchema.index({ deletedAt: 1 })
LeadSchema.index({ createdAt: -1 })

// ── Model ─────────────────────────────────────────────────────
export const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>('Lead', LeadSchema)
