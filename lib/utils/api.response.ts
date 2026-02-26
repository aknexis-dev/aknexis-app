// ============================================================
// RESPONSE UTILS — Standardized API response formatters
// All API routes use these helpers for consistent shape.
// ============================================================

import { NextResponse } from 'next/server'
import { AppError } from '@/lib/errors/AppError'
import { ZodError } from 'zod'

// ── Success Response Shape ────────────────────────────────────
export interface ApiSuccessResponse<T = unknown> {
  success: true
  data?:   T
  meta?:   PaginationMeta
  message?: string
}

// ── Error Response Shape ──────────────────────────────────────
export interface ApiErrorResponse {
  success: false
  error: {
    code:     string
    message:  string
    details?: unknown
  }
}

// ── Pagination ────────────────────────────────────────────────
export interface PaginationMeta {
  page:       number
  limit:      number
  total:      number
  totalPages: number
  hasNext:    boolean
  hasPrev:    boolean
}

// ── Response Builders ─────────────────────────────────────────

export function successResponse<T>(
  data:    T,
  status:  number = 200,
  meta?:   PaginationMeta,
  message?: string
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    { success: true, data, ...(meta && { meta }), ...(message && { message }) },
    { status }
  )
}

export function createdResponse<T>(data: T, message?: string): NextResponse<ApiSuccessResponse<T>> {
  return successResponse(data, 201, undefined, message)
}

export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 })
}

export function errorResponse(
  code:       string,
  message:    string,
  status:     number = 500,
  details?:   unknown
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error: { code, message, ...(details !== undefined && { details }) } },
    { status }
  )
}

// ── Central Error Handler ─────────────────────────────────────
export function handleApiError(err: unknown): NextResponse<ApiErrorResponse> {
  // Known application error
  if (err instanceof AppError) {
    // Don't expose internal error details in production
    const details = err.code === 'VALIDATION_ERROR' ? err.details : undefined
    return errorResponse(err.code, err.message, err.statusCode, details)
  }

  // Zod validation error (caught before reaching service)
  if (err instanceof ZodError) {
    return errorResponse(
      'VALIDATION_ERROR',
      'Validation failed. Please check your input.',
      400,
      err.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
    )
  }

  // Mongoose duplicate key error
  if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: number }).code === 11000
  ) {
    return errorResponse('DUPLICATE_ENTRY', 'A record with this value already exists.', 409)
  }

  // Unknown — log but mask from client
  console.error('[API Error]', err)
  return errorResponse('INTERNAL_ERROR', 'An unexpected error occurred. Please try again.', 500)
}

// ── Pagination Helpers ────────────────────────────────────────

export function parsePaginationParams(searchParams: URLSearchParams): {
  page:  number
  limit: number
  skip:  number
} {
  const page  = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  const skip  = (page - 1) * limit
  return { page, limit, skip }
}

export function buildPaginationMeta(
  total: number,
  page:  number,
  limit: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}
