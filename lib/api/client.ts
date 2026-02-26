// ============================================================
// FRONTEND API CLIENT — Typed HTTP wrappers for all backend routes
// Used by admin dashboard pages and components.
// Handles auth headers, error parsing, and type safety.
// ============================================================

import type { PaginationMeta } from '@/lib/utils/api.response'

// ── Base ─────────────────────────────────────────────────────

export interface ApiSuccess<T = unknown> {
  success: true
  data:    T
  meta?:   PaginationMeta
  message?: string
}

export interface ApiError {
  success: false
  error: {
    code:     string
    message:  string
    details?: unknown
  }
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

export class ApiClientError extends Error {
  constructor(
    public readonly code:    string,
    message:                 string,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function request<T>(
  path:    string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include', // Send session cookie automatically
    ...options,
  })

  const json = await res.json() as ApiResult<T>

  if (!json.success) {
    throw new ApiClientError(json.error.code, json.error.message, json.error.details)
  }

  return (json as ApiSuccess<T>).data
}

async function requestWithMeta<T>(
  path:    string,
  options: RequestInit = {}
): Promise<{ data: T; meta?: PaginationMeta }> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })

  const json = await res.json() as ApiResult<T>

  if (!json.success) {
    throw new ApiClientError(json.error.code, json.error.message, json.error.details)
  }

  const success = json as ApiSuccess<T>
  return { data: success.data, meta: success.meta }
}

function buildQueryString(params: Record<string, unknown>): string {
  const filtered = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  )
  if (!filtered.length) return ''
  return '?' + new URLSearchParams(filtered.map(([k, v]) => [k, String(v)])).toString()
}

// ── Auth API ─────────────────────────────────────────────────

export interface LoginPayload { email: string; password: string }
export interface AuthUser {
  _id:         string
  firstName:   string
  lastName:    string
  email:       string
  role:        'admin' | 'manager' | 'staff'
  isActive:    boolean
  lastLoginAt?: string
  createdAt:   string
}

export const authApi = {
  login: (body: LoginPayload) =>
    request<{ user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  logout: () =>
    request<null>('/api/auth/logout', { method: 'POST' }),

  me: () =>
    request<AuthUser>('/api/auth/me'),
}

// ── Leads API ─────────────────────────────────────────────────

export interface Lead {
  _id:             string
  fullName:        string
  email:           string
  phone?:          string
  companyName:     string
  jobTitle?:       string
  serviceInterest: string
  message:         string
  status:          string
  source:          string
  assignedTo?:     AuthUser
  notes:           Array<{ _id: string; content: string; addedBy: AuthUser; createdAt: string }>
  convertedToClientId?: string
  createdAt:       string
  updatedAt:       string
}

export interface CreateLeadBody {
  fullName:        string
  email:           string
  phone?:          string
  companyName:     string
  jobTitle?:       string
  serviceInterest: string
  message:         string
  source?:         string
}

export interface ListLeadsParams {
  page?:            number
  limit?:           number
  status?:          string
  serviceInterest?: string
  assignedTo?:      string
  search?:          string
  sortBy?:          string
  sortOrder?:       'asc' | 'desc'
}

export const leadsApi = {
  list: (params: ListLeadsParams = {}) =>
    requestWithMeta<Lead[]>(`/api/leads${buildQueryString(params as Record<string, unknown>)}`),

  get: (id: string) =>
    request<Lead>(`/api/leads/${id}`),

  create: (body: CreateLeadBody) =>
    request<Lead>('/api/leads', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  update: (id: string, body: Partial<{ status: string; assignedTo: string }>) =>
    request<Lead>(`/api/leads/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(body),
    }),

  addNote: (id: string, content: string) =>
    request<Lead>(`/api/leads/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify({ note: content }),
    }),

  convert: (id: string, body?: { companyName?: string; accountManager?: string }) =>
    request<{ lead: Lead; client: Client }>(`/api/leads/${id}/convert`, {
      method: 'POST',
      body:   JSON.stringify(body ?? {}),
    }),

  delete: (id: string) =>
    fetch(`/api/leads/${id}`, { method: 'DELETE', credentials: 'include' }),
}

// ── Clients API ───────────────────────────────────────────────

export interface Client {
  _id:             string
  companyName:     string
  industry?:       string
  companySize?:    string
  website?:        string
  primaryContact:  { name: string; email: string; phone?: string; title?: string }
  additionalContacts: Array<{ name: string; email: string; phone?: string; title?: string }>
  status:          string
  accountManager?: AuthUser
  originLeadId?:   string
  clientSince:     string
  billingEmail?:   string
  tags:            string[]
  createdAt:       string
  updatedAt:       string
}

export interface ListClientsParams {
  page?:           number
  limit?:          number
  status?:         string
  accountManager?: string
  search?:         string
  sortBy?:         string
  sortOrder?:      'asc' | 'desc'
}

export const clientsApi = {
  list: (params: ListClientsParams = {}) =>
    requestWithMeta<Client[]>(`/api/clients${buildQueryString(params as Record<string, unknown>)}`),

  get: (id: string) =>
    request<Client>(`/api/clients/${id}`),

  getProjects: (id: string) =>
    request<Project[]>(`/api/clients/${id}/projects`),

  create: (body: Omit<Client, '_id' | 'createdAt' | 'updatedAt' | 'accountManager'> & { accountManager?: string }) =>
    request<Client>('/api/clients', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  update: (id: string, body: Partial<Client>) =>
    request<Client>(`/api/clients/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(body),
    }),

  delete: (id: string) =>
    fetch(`/api/clients/${id}`, { method: 'DELETE', credentials: 'include' }),
}

// ── Projects API ──────────────────────────────────────────────

export interface Project {
  _id:               string
  title:             string
  description?:      string
  clientId:          string | { _id: string; companyName: string }
  type:              string
  status:            string
  priority:          string
  startDate?:        string
  targetEndDate?:    string
  actualEndDate?:    string
  projectManager?:   AuthUser
  teamMembers:       AuthUser[]
  completionPercent: number
  budget?:           { amount: number; currency: string; type: string }
  tags:              string[]
  createdAt:         string
  updatedAt:         string
}

export interface ListProjectsParams {
  page?:           number
  limit?:          number
  clientId?:       string
  status?:         string
  type?:           string
  projectManager?: string
  search?:         string
  sortBy?:         string
  sortOrder?:      'asc' | 'desc'
}

export const projectsApi = {
  list: (params: ListProjectsParams = {}) =>
    requestWithMeta<Project[]>(`/api/projects${buildQueryString(params as Record<string, unknown>)}`),

  get: (id: string) =>
    request<Project>(`/api/projects/${id}`),

  create: (body: {
    title: string
    clientId: string
    type: string
    priority?: string
    startDate?: string
    targetEndDate?: string
    projectManager?: string
    description?: string
  }) =>
    request<Project>('/api/projects', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  update: (id: string, body: Partial<Project & { projectManager?: string }>) =>
    request<Project>(`/api/projects/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(body),
    }),

  delete: (id: string) =>
    fetch(`/api/projects/${id}`, { method: 'DELETE', credentials: 'include' }),
}

// ── Files API ─────────────────────────────────────────────────

export interface UploadedFile {
  _id:          string
  originalName: string
  storageKey:   string
  mimeType:     string
  sizeBytes:    number
  extension:    string
  category:     string
  clientId?:    string
  projectId?:   string
  accessLevel:  string
  description?: string
  uploadedBy:   AuthUser
  tags:         string[]
  isArchived:   boolean
  createdAt:    string
}

export interface ListFilesParams {
  page?:       number
  limit?:      number
  clientId?:   string
  projectId?:  string
  category?:   string
  isArchived?: boolean
  sortBy?:     string
  sortOrder?:  'asc' | 'desc'
}

export const filesApi = {
  list: (params: ListFilesParams = {}) =>
    requestWithMeta<UploadedFile[]>(`/api/files${buildQueryString(params as Record<string, unknown>)}`),

  get: (id: string) =>
    request<UploadedFile>(`/api/files/${id}`),

  requestUploadUrl: (body: {
    originalName: string
    mimeType: string
    sizeBytes: number
    category: string
    clientId?: string
    projectId?: string
  }) =>
    request<{ uploadUrl: string; storageKey: string; expiresAt: string }>('/api/files/upload', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  register: (body: {
    storageKey:   string
    originalName: string
    mimeType:     string
    sizeBytes:    number
    extension:    string
    category:     string
    clientId?:    string
    projectId?:   string
    accessLevel?: string
    description?: string
    tags?:        string[]
  }) =>
    request<UploadedFile>('/api/files', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  getDownloadUrl: (id: string) =>
    request<{ downloadUrl: string; expiresAt: string }>(`/api/files/${id}/download`),

  delete: (id: string) =>
    fetch(`/api/files/${id}`, { method: 'DELETE', credentials: 'include' }),

  /**
   * Full upload flow helper — requests presigned URL, uploads directly to S3,
   * then registers the file metadata in the database.
   */
  upload: async (
    file:     File,
    category: string,
    opts?:    { clientId?: string; projectId?: string; description?: string }
  ): Promise<UploadedFile> => {
    // Step 1 — Get presigned URL
    const ext = file.name.split('.').pop() ?? 'bin'
    const { uploadUrl, storageKey } = await filesApi.requestUploadUrl({
      originalName: file.name,
      mimeType:     file.type,
      sizeBytes:    file.size,
      category,
      ...opts,
    })

    // Step 2 — Upload to S3
    const uploadRes = await fetch(uploadUrl, {
      method:  'PUT',
      body:    file,
      headers: { 'Content-Type': file.type },
    })

    if (!uploadRes.ok) {
      throw new ApiClientError('STORAGE_ERROR', 'File upload to storage failed.')
    }

    // Step 3 — Register metadata in database
    return filesApi.register({
      storageKey,
      originalName: file.name,
      mimeType:     file.type,
      sizeBytes:    file.size,
      extension:    ext,
      category,
      ...opts,
    })
  },
}

// ── Dashboard API ─────────────────────────────────────────────

export interface DashboardStats {
  leads: {
    total:      number
    thisMonth:  number
    new:        number
    byStatus:   Record<string, number>
  }
  clients: {
    total:   number
    active:  number
    byStatus: Record<string, number>
  }
  projects: {
    total:    number
    active:   number
    dueSoon:  number
    byStatus: Record<string, number>
  }
  files: {
    total:             number
    totalStorageBytes: number
  }
  recentLeads: Array<{
    _id:             string
    fullName:        string
    email:           string
    companyName:     string
    serviceInterest: string
    status:          string
    createdAt:       string
  }>
  conversionRate: number
}

export const dashboardApi = {
  getStats: () => request<DashboardStats>('/api/dashboard'),
}

// ── Users API ─────────────────────────────────────────────────

export const usersApi = {
  list: (page = 1, limit = 20) =>
    requestWithMeta<AuthUser[]>(`/api/users${buildQueryString({ page, limit })}`),

  get: (id: string) =>
    request<AuthUser>(`/api/users/${id}`),

  create: (body: {
    firstName: string
    lastName:  string
    email:     string
    password:  string
    role?:     'admin' | 'manager' | 'staff'
  }) =>
    request<AuthUser>('/api/users', {
      method: 'POST',
      body:   JSON.stringify(body),
    }),

  update: (id: string, body: { firstName?: string; lastName?: string; role?: string; isActive?: boolean }) =>
    request<AuthUser>(`/api/users/${id}`, {
      method: 'PATCH',
      body:   JSON.stringify(body),
    }),

  delete: (id: string) =>
    fetch(`/api/users/${id}`, { method: 'DELETE', credentials: 'include' }),
}
