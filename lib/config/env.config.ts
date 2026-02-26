// ============================================================
// ENVIRONMENT CONFIGURATION — Central config module
// All environment variables accessed through this module only.
// Never import process.env directly in business logic.
// ============================================================

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    // In production, fail hard immediately
    if (process.env.APP_ENV === 'production') {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    // In development, warn — allows running the UI before backend is wired
    console.warn(`[Config] Warning: environment variable "${key}" is not set.`)
    return ''
  }
  return value
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback
}

// ── Database ─────────────────────────────────────────────────
export const DB_CONFIG = {
  uri:    requireEnv('MONGODB_URI'),
  dbName: optionalEnv('MONGODB_DB_NAME', 'aknexis'),
} as const

// ── Authentication ────────────────────────────────────────────
export const AUTH_CONFIG = {
  jwtSecret:   requireEnv('JWT_SECRET'),
  jwtExpiresIn: optionalEnv('JWT_EXPIRES_IN', '24h'),
  bcryptRounds: parseInt(optionalEnv('BCRYPT_ROUNDS', '12'), 10),
  cookieName:   'aknexis_session',
  cookieMaxAge: 24 * 60 * 60 * 1000, // 24 hours in ms
} as const

// ── Storage ────────────────────────────────────────────────────
export const STORAGE_CONFIG = {
  provider:       optionalEnv('STORAGE_PROVIDER', 's3') as 's3' | 'r2',
  region:         optionalEnv('AWS_REGION', 'us-east-1'),
  accessKeyId:    optionalEnv('AWS_ACCESS_KEY_ID', ''),
  secretAccessKey: optionalEnv('AWS_SECRET_ACCESS_KEY', ''),
  bucketName:     optionalEnv('S3_BUCKET_NAME', 'aknexis-files'),
  maxFileSizeMB:  parseInt(optionalEnv('S3_UPLOAD_MAX_SIZE_MB', '50'), 10),
  signedUrlExpiry: 300, // 5 minutes
} as const

// ── Application ────────────────────────────────────────────────
export const APP_CONFIG = {
  appUrl:   optionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  env:      optionalEnv('APP_ENV', 'development') as 'development' | 'staging' | 'production',
  isDev:    optionalEnv('APP_ENV', 'development') === 'development',
  isProd:   optionalEnv('APP_ENV', 'development') === 'production',
} as const

// ── Rate Limiting ──────────────────────────────────────────────
export const RATE_LIMIT_CONFIG = {
  windowMs:    parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10), // 15 min
  maxRequests: parseInt(optionalEnv('RATE_LIMIT_MAX_REQUESTS', '100'), 10),
  loginMax:    5, // Max login attempts per window
} as const

// ── Email ──────────────────────────────────────────────────────
export const EMAIL_CONFIG = {
  provider:   optionalEnv('EMAIL_PROVIDER', 'sendgrid'),
  apiKey:     optionalEnv('SENDGRID_API_KEY', ''),
  from:       optionalEnv('EMAIL_FROM', 'noreply@aknexis.io'),
  notifyLeads: optionalEnv('EMAIL_NOTIFY_LEADS', 'admin@aknexis.io'),
} as const

// ── Allowed CORS origins ───────────────────────────────────────
export const SECURITY_CONFIG = {
  allowedOrigins: optionalEnv('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
} as const
