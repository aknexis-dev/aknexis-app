// ============================================================
// USER MODEL — Internal platform users (admin / manager / staff)
// ============================================================

import mongoose, { Schema, type Document, type Model } from 'mongoose'

// ── Role Definition ───────────────────────────────────────────
export const USER_ROLES = ['admin', 'manager', 'staff'] as const
export type UserRole = typeof USER_ROLES[number]

// ── Document Interface ────────────────────────────────────────
export interface IUser extends Document {
  _id:           mongoose.Types.ObjectId
  firstName:     string
  lastName:      string
  email:         string
  passwordHash:  string
  role:          UserRole
  isActive:      boolean
  lastLoginAt?:  Date
  deletedAt?:    Date
  createdAt:     Date
  updatedAt:     Date

  // Virtual
  fullName:      string
}

// ── Schema ────────────────────────────────────────────────────
const UserSchema = new Schema<IUser>(
  {
    firstName:    { type: String, required: true, trim: true, maxlength: 50 },
    lastName:     { type: String, required: true, trim: true, maxlength: 50 },
    email:        {
      type:     String,
      required: true,
      unique:   true,
      trim:     true,
      lowercase: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    passwordHash: { type: String, required: true, select: false }, // Never returned by default
    role:         { type: String, enum: USER_ROLES, default: 'staff' },
    isActive:     { type: Boolean, default: true, index: true },
    lastLoginAt:  { type: Date },
    deletedAt:    { type: Date, index: true }, // Soft delete
  },
  {
    timestamps: true,
    toJSON:     {
      virtuals: true,
      transform: (_doc, ret) => {
        const { passwordHash, __v, ...result } = ret
        return result
      },
    },
    toObject: { virtuals: true },
  }
)

// ── Indexes ───────────────────────────────────────────────────
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ role: 1, isActive: 1 })

// ── Virtual: fullName ─────────────────────────────────────────
UserSchema.virtual('fullName').get(function (this: IUser): string {
  return `${this.firstName} ${this.lastName}`
})

// ── Scope: active (non-deleted) ───────────────────────────────
UserSchema.statics.findActive = function () {
  return this.find({ deletedAt: null, isActive: true })
}

// ── Model ─────────────────────────────────────────────────────
export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema)
