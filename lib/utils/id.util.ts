// ============================================================
// ID & MONGODB UTILITIES
// ============================================================

import mongoose from 'mongoose'
import { AppError } from '@/lib/errors/AppError'

export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id)
}

export function validateObjectId(id: string, field = 'id'): void {
  if (!isValidObjectId(id)) {
    throw AppError.invalidId(field)
  }
}

export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id)
}
