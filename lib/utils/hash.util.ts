// ============================================================
// HASH UTILITIES — Password encryption and verification
// ============================================================

import bcrypt from 'bcryptjs'
import { AUTH_CONFIG } from '@/lib/config/env.config'

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, AUTH_CONFIG.bcryptRounds)
}

export async function verifyPassword(
  plaintext: string,
  hash:      string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash)
}
