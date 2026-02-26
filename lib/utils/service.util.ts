// ============================================================
// SERVICE UTILITIES — Shared helpers used by all services
// ============================================================

import type { PaginationMeta } from '@/lib/utils/api.response'

export function buildPaginationMeta(
  total: number,
  page:  number,
  limit: number
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function sanitizeString(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

// Build a Mongoose sort object from string fields
export function buildSort(
  sortBy:    string,
  sortOrder: 'asc' | 'desc'
): Record<string, 1 | -1> {
  return { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
}
