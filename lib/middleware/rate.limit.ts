// ============================================================
// RATE LIMITING — Per-IP sliding window limiter
// In-memory for Phase-1. Interface allows Redis swap in Phase-2.
// ============================================================

import type { NextRequest } from 'next/server'
import { AppError } from '@/lib/errors/AppError'
import { RATE_LIMIT_CONFIG } from '@/lib/config/env.config'

interface RateLimitEntry {
  count:     number
  resetTime: number
}

// Simple in-memory store — works for single-instance deployments
// Phase-2: swap with Redis via Upstash or ioredis
const store = new Map<string, RateLimitEntry>()

// Clean expired entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetTime) store.delete(key)
  }
}, 10 * 60 * 1000)

export interface RateLimitOptions {
  windowMs?:   number
  maxRequests?: number
  keyPrefix?:  string
}

export function rateLimit(req: NextRequest, options: RateLimitOptions = {}): void {
  const {
    windowMs   = RATE_LIMIT_CONFIG.windowMs,
    maxRequests = RATE_LIMIT_CONFIG.maxRequests,
    keyPrefix  = 'global',
  } = options

  const ip  = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown'
  const key = `${keyPrefix}:${ip}`
  const now = Date.now()

  let entry = store.get(key)

  if (!entry || now > entry.resetTime) {
    entry = { count: 0, resetTime: now + windowMs }
    store.set(key, entry)
  }

  entry.count++

  if (entry.count > maxRequests) {
    throw new AppError(
      'INTERNAL_ERROR',
      'Too many requests. Please wait before trying again.',
      429
    )
  }
}

// Stricter rate limit for auth endpoints
export function rateLimitLogin(req: NextRequest): void {
  rateLimit(req, {
    windowMs:    15 * 60 * 1000, // 15 min
    maxRequests: RATE_LIMIT_CONFIG.loginMax,
    keyPrefix:   'login',
  })
}

// Rate limit for public lead submission
export function rateLimitLeadSubmission(req: NextRequest): void {
  rateLimit(req, {
    windowMs:    60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    keyPrefix:   'leads',
  })
}
