# AKnexis — Backend API Reference

## Architecture Overview

```
Request → Rate Limit → Auth Middleware → Route Handler
                                           ↓
                               Zod Schema Validation
                                           ↓
                               Service (Business Logic)
                                           ↓
                               Mongoose Model (MongoDB)
                                           ↓
                               Standardized JSON Response
```

## Authentication

All admin API endpoints require a valid JWT in one of:
- `Authorization: Bearer <token>` header
- `aknexis_session` HTTP-only cookie (set on login)

### Role Matrix

| Role    | Leads | Clients | Projects | Files | Users | Dashboard |
|---------|-------|---------|----------|-------|-------|-----------|
| staff   | R     | R       | R        | R     | —     | R         |
| manager | CRUD  | CRUD    | CRUD     | CRUD  | —     | R         |
| admin   | CRUD  | CRUD    | CRUD     | CRUD  | CRUD  | R         |

## Standard Response Shapes

### Success
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1, "limit": 20, "total": 47,
    "totalPages": 3, "hasNext": true, "hasPrev": false
  },
  "message": "Optional human-readable message"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check your input.",
    "details": [{ "path": "email", "message": "Invalid email address" }]
  }
}
```

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | Public | Login, returns JWT in cookie |
| POST | `/api/auth/logout` | Public | Clear session cookie |
| GET | `/api/auth/me` | Any | Get current user |

**Login request:**
```json
{ "email": "admin@aknexis.io", "password": "Admin@123456" }
```

---

### Leads
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/leads` | Public | Submit website contact form |
| GET | `/api/leads` | Manager+ | List leads (paginated) |
| GET | `/api/leads/:id` | Manager+ | Get single lead |
| PATCH | `/api/leads/:id` | Manager+ | Update status/assignment |
| DELETE | `/api/leads/:id` | Manager+ | Soft delete |
| POST | `/api/leads/:id/convert` | Admin | Convert lead → client |

**Query params for GET /api/leads:**
- `page`, `limit` — pagination
- `status` — filter by status
- `serviceInterest` — filter by service
- `assignedTo` — filter by assignee ID
- `search` — search name/email/company
- `sortBy`, `sortOrder` — sorting

---

### Clients
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/clients` | Admin | Create client |
| GET | `/api/clients` | Manager+ | List clients |
| GET | `/api/clients/:id` | Manager+ | Get single client |
| PATCH | `/api/clients/:id` | Manager+ | Update client |
| DELETE | `/api/clients/:id` | Admin | Soft delete |
| GET | `/api/clients/:id/projects` | Manager+ | Get client's projects |

---

### Projects
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/projects` | Manager+ | Create project |
| GET | `/api/projects` | Manager+ | List projects |
| GET | `/api/projects/:id` | Manager+ | Get single project |
| PATCH | `/api/projects/:id` | Manager+ | Update project |
| DELETE | `/api/projects/:id` | Admin | Soft delete |

**Status transition rules:**
```
scoping → proposal | cancelled
proposal → active | scoping | cancelled
active → on_hold | completed | cancelled
on_hold → active | cancelled
completed → (terminal)
cancelled → (terminal)
```

---

### Files
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/files` | Manager+ | List files |
| POST | `/api/files` | Manager+ | Register file metadata |
| POST | `/api/files/upload` | Manager+ | Request presigned upload URL |
| GET | `/api/files/:id` | Manager+ | Get file metadata |
| GET | `/api/files/:id/download` | Manager+ | Get presigned download URL |
| DELETE | `/api/files/:id` | Admin | Delete file |

**File upload flow:**
1. `POST /api/files/upload` with `{ originalName, mimeType, sizeBytes, category }`
2. Receive `{ uploadUrl, storageKey, expiresAt }` in response
3. `PUT <uploadUrl>` with file binary directly to S3
4. `POST /api/files` to register `{ storageKey, originalName, mimeType, ... }`

---

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/users` | Admin | List users |
| POST | `/api/users` | Admin | Create user |
| GET | `/api/users/:id` | Admin | Get single user |
| PATCH | `/api/users/:id` | Admin | Update role/status |
| DELETE | `/api/users/:id` | Admin | Soft delete |

---

### Dashboard
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/dashboard` | Manager+ | Aggregate stats overview |

---

## Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `UNAUTHORIZED` | 401 | No token or invalid token |
| `FORBIDDEN` | 403 | Insufficient role |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `INVALID_ID` | 400 | Malformed MongoDB ObjectId |
| `CONFLICT` | 409 | Duplicate or invalid state |
| `LEAD_ALREADY_CONVERTED` | 409 | Lead already converted |
| `INVALID_STATUS_TRANSITION` | 409 | Invalid project state machine transition |
| `FILE_TOO_LARGE` | 400 | File exceeds 50 MB limit |
| `INVALID_FILE_TYPE` | 400 | MIME type not allowed |
| `DATABASE_ERROR` | 500 | MongoDB operation failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## Environment Setup

See `.env.example` for all required variables. Minimum for Phase-1:

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=aknexis
JWT_SECRET=at-least-64-random-characters-here
```

## Seeding Development Data

```bash
MONGODB_URI=<your-uri> npm run db:seed
```

Creates:
- Admin: `admin@aknexis.io` / `Admin@123456`
- Manager: `manager@aknexis.io` / `Staff@123456`
- Staff: `staff@aknexis.io` / `Staff@123456`
- 5 sample leads, 2 clients, 2 projects
