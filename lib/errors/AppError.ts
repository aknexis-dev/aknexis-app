// ============================================================
// ERROR SYSTEM — Structured application errors
// All thrown errors in the system use this class.
// ============================================================

export type ErrorCode =
  // Auth
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INVALID_CREDENTIALS'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  // Validation
  | 'VALIDATION_ERROR'
  | 'INVALID_ID'
  // Resource
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'DUPLICATE_ENTRY'
  // Business logic
  | 'LEAD_ALREADY_CONVERTED'
  | 'INVALID_STATUS_TRANSITION'
  | 'FILE_TOO_LARGE'
  | 'INVALID_FILE_TYPE'
  // Infrastructure
  | 'DATABASE_ERROR'
  | 'STORAGE_ERROR'
  | 'EMAIL_ERROR'
  | 'INTERNAL_ERROR'

export class AppError extends Error {
  public readonly code:       ErrorCode
  public readonly statusCode: number
  public readonly details?:   unknown
  public readonly isOperational: boolean

  constructor(
    code:       ErrorCode,
    message:    string,
    statusCode: number = 500,
    details?:   unknown
  ) {
    super(message)
    this.name          = 'AppError'
    this.code          = code
    this.statusCode    = statusCode
    this.details       = details
    this.isOperational = true // Operational errors = expected, safe to expose message
    Error.captureStackTrace(this, this.constructor)
  }

  // ── Factory methods ──────────────────────────────────────────

  static unauthorized(message = 'Authentication required'): AppError {
    return new AppError('UNAUTHORIZED', message, 401)
  }

  static forbidden(message = 'You do not have permission to perform this action'): AppError {
    return new AppError('FORBIDDEN', message, 403)
  }

  static notFound(resource = 'Resource'): AppError {
    return new AppError('NOT_FOUND', `${resource} not found`, 404)
  }

  static conflict(message: string, details?: unknown): AppError {
    return new AppError('CONFLICT', message, 409, details)
  }

  static validationError(message: string, details?: unknown): AppError {
    return new AppError('VALIDATION_ERROR', message, 400, details)
  }

  static invalidId(field = 'id'): AppError {
    return new AppError('INVALID_ID', `Invalid ${field} format`, 400)
  }

  static internal(message = 'An unexpected error occurred'): AppError {
    return new AppError('INTERNAL_ERROR', message, 500)
  }

  static database(message = 'Database operation failed'): AppError {
    return new AppError('DATABASE_ERROR', message, 500)
  }
}

// ── HTTP Status → Default Message Map ────────────────────────
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
}
