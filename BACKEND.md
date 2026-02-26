# AKnexis — Backend Architecture & Setup Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Internet (HTTPS)                     │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   Vercel / Next.js 14                    │
│  App Router + API Routes                                 │
│                                                          │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │  Public UI  │   │  Admin UI    │   │  API Routes  │  │
│  │  /contact   │   │  /admin/**   │   │  /api/**     │  │
│  └─────────────┘   └──────────────┘   └──────┬───────┘  │
│                                              │           │
│  ┌───────────────────────────────────────────▼─────────┐ │
│  │                  Request Pipeline                    │ │
│  │  Rate Limit → Auth Middleware → Zod Validation       │ │
│  └───────────────────────────────────────────┬─────────┘ │
│                                              │           │
│  ┌───────────────────────────────────────────▼─────────┐ │
│  │                   Service Layer                      │ │
│  │  LeadService · ClientService · ProjectService        │ │
│  │  FileService · AuthService · DashboardService        │ │
│  └───────────────────────────────────────────┬─────────┘ │
└──────────────────────────────────────────────┼───────────┘
                                               │
            ┌──────────────────────────────────┴──────────┐
            │                                              │
 ┌──────────▼──────────┐                   ┌──────────────▼──────┐
 │    MongoDB Atlas     │                   │     AWS S3 / R2     │
 │  Mongoose ODM        │                   │  File Storage        │
 │                      │                   │  Presigned URLs      │
 │  Collections:        │                   └─────────────────────┘
 │  · users             │
 │  · leads             │
 │  · clients           │
 │  · projects          │
 │  · files (metadata)  │
 └──────────────────────┘
```

## Layer Responsibilities

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Routes/Controllers | `app/api/**` | Auth guard, validation, response formatting |
| Services | `lib/services/` | Business logic, workflows, rules |
| Models | `lib/db/models/` | Schema, indexes, data shape |
| Middleware | `lib/middleware/` | Auth guards, rate limiting |
| Config | `lib/config/` | Environment variables, constants |
| Utils | `lib/utils/` | Shared helpers: JWT, hash, pagination, response |

## Setup (Development)

### 1. Prerequisites

- Node.js 20+
- MongoDB Atlas account (free tier works for dev)
- AWS account or Cloudflare R2 (for file storage)

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```bash
# Required for backend to start
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true
JWT_SECRET=your-minimum-64-character-random-secret-string-use-openssl-rand-hex-32

# Optional (have defaults)
MONGODB_DB_NAME=aknexis
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File storage (required for upload endpoints)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET_NAME=aknexis-platform-files
```

Generate a secure JWT secret:
```bash
openssl rand -hex 32
```

### 4. Seed the database

```bash
npm run db:seed
```

This creates:

| Role    | Email                   | Password       |
|---------|-------------------------|----------------|
| admin   | admin@aknexis.io        | Admin@123456   |
| manager | manager@aknexis.io      | Staff@123456   |
| staff   | staff@aknexis.io        | Staff@123456   |

Plus sample leads, clients, and projects.

### 5. Start development server

```bash
npm run dev
```

The API is available at `http://localhost:3000/api`.

## API Quick Reference

### Authentication

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email": "admin@aknexis.io", "password": "Admin@123456"}'

# Use the session cookie automatically
curl http://localhost:3000/api/dashboard -b cookies.txt
```

### Leads (public endpoint)

```bash
# Submit website contact form (no auth)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Smith",
    "email": "john@acme.com",
    "companyName": "Acme Corp",
    "serviceInterest": "software_engineering",
    "message": "We need help building our internal platform."
  }'
```

### Dashboard

```bash
# Get aggregate stats (requires manager+ role)
curl http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer <token>"
```

## Role Permissions Matrix

| Endpoint | staff | manager | admin |
|----------|-------|---------|-------|
| `GET /api/dashboard` | ✓ | ✓ | ✓ |
| `POST /api/leads` | public | public | public |
| `GET /api/leads` | — | ✓ | ✓ |
| `PATCH /api/leads/:id` | — | ✓ | ✓ |
| `POST /api/leads/:id/convert` | — | — | ✓ |
| `GET /api/clients` | — | ✓ | ✓ |
| `POST /api/clients` | — | — | ✓ |
| `GET /api/projects` | — | ✓ | ✓ |
| `POST /api/projects` | — | ✓ | ✓ |
| `GET /api/files` | — | ✓ | ✓ |
| `POST /api/files/upload` | — | ✓ | ✓ |
| `GET /api/users` | — | — | ✓ |
| `POST /api/users` | — | — | ✓ |

## Database Collections

### `leads`
Captures every website inquiry. Status lifecycle:
```
new → contacted → qualified → proposal_sent → converted
                                             → lost / spam
```

### `clients`
Converted business relationships. Created from `leads` via `POST /api/leads/:id/convert`.

### `projects`
Work engagements per client. Status lifecycle:
```
scoping → proposal → active → completed
                   → on_hold → active / cancelled
```

### `files`
File metadata only — binary content lives in S3/R2. Each file record has:
- `storageKey` — S3 object key
- `clientId` — linked client (optional)
- `projectId` — linked project (optional)
- `uploadedBy` — user who uploaded

### `users`
Internal team members with hashed passwords. Roles: `admin`, `manager`, `staff`.

## File Upload Flow

Upload is a 3-step process that avoids routing large files through the server:

```
1. POST /api/files/upload    → Get presigned S3 PUT URL
2. PUT <s3-url>              → Upload file directly to S3 (browser)
3. POST /api/files           → Register metadata in MongoDB
```

Using the frontend client:
```typescript
import { filesApi } from '@/lib/api/client'

const file = await filesApi.upload(fileObject, 'contract', {
  clientId: 'client_id_here',
})
```

## Security Architecture

### JWT + Cookie Sessions
- Login returns JWT signed with `JWT_SECRET`
- Token stored as HTTP-only cookie (not accessible from JavaScript)
- Also accepted as `Authorization: Bearer <token>` header
- Token expires in `JWT_EXPIRES_IN` (default 24h)

### Password Storage
- Bcrypt with configurable rounds (default: 12)
- `passwordHash` field excluded from all queries by default (`select: false`)
- Timing-safe comparison to prevent user enumeration

### Input Validation
- Every request validated with Zod before reaching service layer
- Mongoose schema provides a second layer of validation
- MongoDB ObjectId format validated before queries

### Rate Limiting
- In-memory sliding window (Phase-1)
- Lead submission: 5 requests/IP/hour
- Login: 5 attempts/IP/15 minutes
- Phase-2: swap with Redis-backed (Upstash) for multi-instance

### Soft Deletes
- All entities use `deletedAt` field instead of hard delete
- Queries filter with `{ deletedAt: null }` by default
- Business data is never permanently destroyed in Phase-1

## Error Response Format

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check your input.",
    "details": [
      { "path": "email", "message": "Invalid email address" }
    ]
  }
}
```

### Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `UNAUTHORIZED` | 401 | No valid session token |
| `FORBIDDEN` | 403 | Insufficient role |
| `INVALID_CREDENTIALS` | 401 | Bad email/password |
| `TOKEN_EXPIRED` | 401 | JWT expired |
| `VALIDATION_ERROR` | 400 | Input failed validation |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `CONFLICT` | 409 | Duplicate or invalid transition |
| `LEAD_ALREADY_CONVERTED` | 409 | Lead already has a client |
| `INVALID_STATUS_TRANSITION` | 409 | Invalid project state change |
| `FILE_TOO_LARGE` | 400 | Exceeds 50MB limit |
| `INVALID_FILE_TYPE` | 400 | MIME type not allowed |
| `INTERNAL_ERROR` | 500 | Server error (safe message) |

## Deployment (Vercel)

### 1. Connect repository to Vercel

### 2. Set environment variables in Vercel dashboard

Required production variables:
```
MONGODB_URI             — MongoDB Atlas production cluster URI
JWT_SECRET              — Min 64 chars, randomly generated
MONGODB_DB_NAME         — aknexis_prod
APP_ENV                 — production
NEXT_PUBLIC_APP_URL     — https://yourdomain.com
AWS_REGION              — us-east-1 (or your region)
AWS_ACCESS_KEY_ID       — IAM user with S3 access
AWS_SECRET_ACCESS_KEY   — IAM secret
S3_BUCKET_NAME          — your-prod-bucket-name
EMAIL_FROM              — noreply@yourdomain.com
EMAIL_NOTIFY_LEADS      — admin@yourdomain.com
```

### 3. MongoDB Atlas production setup

1. Create M10+ dedicated cluster for production
2. Enable network peering or IP allowlist for Vercel IPs
3. Create a dedicated database user with least-privilege access
4. Enable MongoDB Atlas Backups (point-in-time)

### 4. S3 bucket setup

Create an S3 bucket with:
```json
{
  "CORSConfiguration": [{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "MaxAgeSeconds": 3600
  }]
}
```

Create IAM policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

## Phase-2 Expansion Checklist

The architecture is ready for these additions without restructuring:

- [ ] **Redis rate limiting** — Swap `lib/middleware/rate.limit.ts` store from `Map` to Upstash Redis
- [ ] **Email notifications** — Add SendGrid calls in `LeadService.createLead()`
- [ ] **Audit logging** — Add `ActivityLog` model, call in each service mutation
- [ ] **Multi-tenant** — Add `organizationId` field to all models + middleware scoping
- [ ] **Billing** — Add `Subscription` and `Invoice` models; Stripe webhooks in `app/api/webhooks/stripe/route.ts`
- [ ] **Client portal** — Add `portal` role, restrict queries to own data via middleware
- [ ] **Analytics** — `DashboardService` already aggregates; extend with time-series pipeline
- [ ] **Testing** — Each `*Service` class is independently testable with a mock `connectDB`

## Running in Production Mode Locally

```bash
npm run build && npm run start
```

## Type Checking

```bash
npm run type-check
```
