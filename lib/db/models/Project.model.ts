// ============================================================
// PROJECT MODEL — Client engagements / work delivered
// ============================================================

import mongoose, { Schema, type Document, type Model } from 'mongoose'

// ── Enums ─────────────────────────────────────────────────────
export const PROJECT_STATUSES  = ['scoping', 'proposal', 'active', 'on_hold', 'completed', 'cancelled'] as const
export const PROJECT_TYPES     = ['software_engineering', 'growth_intelligence', 'business_foundation', 'mixed'] as const
export const PROJECT_PRIORITIES = ['low', 'medium', 'high', 'critical'] as const
export const BUDGET_TYPES      = ['fixed', 'retainer', 'advisory', 'time_and_materials'] as const

export type ProjectStatus   = typeof PROJECT_STATUSES[number]
export type ProjectType     = typeof PROJECT_TYPES[number]
export type ProjectPriority = typeof PROJECT_PRIORITIES[number]
export type BudgetType      = typeof BUDGET_TYPES[number]

// ── Sub-document interfaces ───────────────────────────────────
export interface IProjectMilestone {
  _id:          mongoose.Types.ObjectId
  title:        string
  description?: string
  dueDate?:     Date
  completedAt?: Date
  status:       'pending' | 'in_progress' | 'completed'
}

export interface IProjectNote {
  _id:       mongoose.Types.ObjectId
  content:   string
  addedBy:   mongoose.Types.ObjectId
  createdAt: Date
}

export interface IProjectBudget {
  amount:   number
  currency: string
  type:     BudgetType
}

// ── Document Interface ────────────────────────────────────────
export interface IProject extends Document {
  _id:               mongoose.Types.ObjectId
  title:             string
  description?:      string
  clientId:          mongoose.Types.ObjectId
  type:              ProjectType
  status:            ProjectStatus
  priority:          ProjectPriority
  startDate?:        Date
  targetEndDate?:    Date
  actualEndDate?:    Date
  projectManager?:   mongoose.Types.ObjectId
  teamMembers:       mongoose.Types.ObjectId[]
  budget?:           IProjectBudget
  completionPercent: number
  milestones:        IProjectMilestone[]
  notes:             IProjectNote[]
  tags:              string[]
  deletedAt?:        Date
  createdAt:         Date
  updatedAt:         Date
}

// ── Schema ────────────────────────────────────────────────────
const MilestoneSchema = new Schema<IProjectMilestone>(
  {
    title:        { type: String, required: true, trim: true, maxlength: 200 },
    description:  { type: String, trim: true, maxlength: 1000 },
    dueDate:      Date,
    completedAt:  Date,
    status:       { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  },
  { _id: true }
)

const ProjectNoteSchema = new Schema<IProjectNote>(
  {
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const BudgetSchema = new Schema<IProjectBudget>(
  {
    amount:   { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', maxlength: 3 },
    type:     { type: String, enum: BUDGET_TYPES, required: true },
  },
  { _id: false }
)

const ProjectSchema = new Schema<IProject>(
  {
    title:        { type: String, required: true, trim: true, maxlength: 200 },
    description:  { type: String, trim: true, maxlength: 2000 },
    clientId:     { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    type:         { type: String, enum: PROJECT_TYPES, required: true },
    status:       { type: String, enum: PROJECT_STATUSES, default: 'scoping', index: true },
    priority:     { type: String, enum: PROJECT_PRIORITIES, default: 'medium' },
    startDate:    Date,
    targetEndDate: Date,
    actualEndDate: Date,
    projectManager: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    teamMembers:    { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    budget:         BudgetSchema,
    completionPercent: { type: Number, default: 0, min: 0, max: 100 },
    milestones:     { type: [MilestoneSchema], default: [] },
    notes:          { type: [ProjectNoteSchema], default: [] },
    tags:           { type: [String], default: [] },
    deletedAt:      { type: Date, index: true },
  },
  {
    timestamps: true,
    toJSON:     {
      virtuals: true,
      transform: (_doc, ret) => { delete (ret as Partial<typeof ret>).__v; return ret },
    },
    toObject: { virtuals: true },
  }
)

// ── Indexes ───────────────────────────────────────────────────
ProjectSchema.index({ clientId: 1, status: 1 })
ProjectSchema.index({ projectManager: 1, status: 1 })
ProjectSchema.index({ status: 1, targetEndDate: 1 })
ProjectSchema.index({ deletedAt: 1 })

// ── Model ─────────────────────────────────────────────────────
export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', ProjectSchema)
