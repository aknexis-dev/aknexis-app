// ============================================================
// CONTROLLERS — Architecture Note
// ============================================================
//
// In this backend architecture, Next.js API route files
// (app/api/**/**/route.ts) act as the controller layer.
//
// Each route file is responsible for:
//   1. Authentication & authorization check (middleware)
//   2. Input validation (Zod schema)
//   3. Delegating to the appropriate Service
//   4. Formatting the standardized response
//
// This is intentionally thin — no business logic lives here.
//
// Route files map to controllers as follows:
//
//   /app/api/leads/route.ts              → LeadService
//   /app/api/leads/[id]/route.ts         → LeadService
//   /app/api/leads/[id]/convert/route.ts → LeadService.convertToClient
//
//   /app/api/clients/route.ts            → ClientService
//   /app/api/clients/[id]/route.ts       → ClientService
//   /app/api/clients/[id]/projects/route.ts → ClientService.getClientProjects
//
//   /app/api/projects/route.ts           → ProjectService
//   /app/api/projects/[id]/route.ts      → ProjectService
//
//   /app/api/files/route.ts              → FileService
//   /app/api/files/upload/route.ts       → FileService.requestUploadUrl
//   /app/api/files/[id]/route.ts         → FileService
//   /app/api/files/[id]/download/route.ts → FileService.getDownloadUrl
//
//   /app/api/auth/login/route.ts         → AuthService.login
//   /app/api/auth/logout/route.ts        → (clears session cookie)
//   /app/api/auth/me/route.ts            → AuthService.getMe
//
//   /app/api/users/route.ts              → UserService
//   /app/api/users/[id]/route.ts         → UserService
//
//   /app/api/dashboard/route.ts          → DashboardService.getStats
//
// If the project migrates to a dedicated Node.js/Fastify/NestJS
// backend in Phase-3, each route file maps cleanly to a dedicated
// controller class, and services are imported as-is.
//
// ── Business Logic Lives In: ──────────────────────────────────
//
//   lib/services/auth.service.ts      — Auth, user management
//   lib/services/lead.service.ts      — Lead lifecycle
//   lib/services/client.service.ts    — Client management
//   lib/services/project.service.ts   — Project management
//   lib/services/file.service.ts      — File storage + metadata
//   lib/services/dashboard.service.ts — Aggregate analytics
//
// ── Data Access Lives In: ────────────────────────────────────
//
//   lib/db/models/User.model.ts
//   lib/db/models/Lead.model.ts
//   lib/db/models/Client.model.ts
//   lib/db/models/Project.model.ts
//   lib/db/models/File.model.ts
//
// ── See also: ────────────────────────────────────────────────
//
//   API.md — Full endpoint reference with auth matrix
//   BACKEND.md — Setup, deployment, environment guide
//
// ============================================================
