// ============================================================
// VALIDATION SCHEMAS — Zod schemas for all API inputs
// Single source of truth for request validation.
// ============================================================

import { z } from 'zod'
import { SERVICE_INTERESTS, LEAD_STATUSES, LEAD_SOURCES } from '@/lib/db/models/Lead.model'
import { CLIENT_STATUSES, COMPANY_SIZES }                 from '@/lib/db/models/Client.model'
import { PROJECT_STATUSES, PROJECT_TYPES, PROJECT_PRIORITIES, BUDGET_TYPES } from '@/lib/db/models/Project.model'
import { FILE_CATEGORIES, ACCESS_LEVELS }                 from '@/lib/db/models/File.model'
import { USER_ROLES }                                     from '@/lib/db/models/User.model'

// ── Shared primitives ─────────────────────────────────────────
const emailField    = z.string().email('Invalid email address').max(254).toLowerCase()
const phoneField    = z.string().trim().max(30).optional()
const mongoIdField  = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID format')
const dateField     = z.string().datetime({ offset: true }).or(z.date()).optional()
const urlField      = z.string().url().max(500).optional()

// ── Auth ──────────────────────────────────────────────────────
export const loginSchema = z.object({
  email:    emailField,
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
})

export type LoginInput = z.infer<typeof loginSchema>

// ── Users ─────────────────────────────────────────────────────
export const createUserSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName:  z.string().trim().min(1).max(50),
  email:     emailField,
  password:  z.string().min(8).max(128).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  role: z.enum(USER_ROLES).default('staff'),
})

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(1).max(50).optional(),
  lastName:  z.string().trim().min(1).max(50).optional(),
  role:      z.enum(USER_ROLES).optional(),
  isActive:  z.boolean().optional(),
})

export type CreateUserInput  = z.infer<typeof createUserSchema>
export type UpdateUserInput  = z.infer<typeof updateUserSchema>

// ── Leads ─────────────────────────────────────────────────────
export const createLeadSchema = z.object({
  fullName:        z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email:           emailField,
  phone:           phoneField,
  companyName:     z.string().trim().min(1, 'Company name is required').max(200),
  jobTitle:        z.string().trim().max(100).optional(),
  serviceInterest: z.enum(SERVICE_INTERESTS, { required_error: 'Service interest is required' }),
  message:         z.string().trim().min(20, 'Message must be at least 20 characters').max(2000),
  source:          z.enum(LEAD_SOURCES).default('website_contact'),
  // UTM attribution
  utmSource:   z.string().trim().max(100).optional(),
  utmMedium:   z.string().trim().max(100).optional(),
  utmCampaign: z.string().trim().max(100).optional(),
})

export const updateLeadSchema = z.object({
  status:     z.enum(LEAD_STATUSES).optional(),
  assignedTo: mongoIdField.optional(),
  jobTitle:   z.string().trim().max(100).optional(),
  phone:      phoneField,
})

export const addLeadNoteSchema = z.object({
  content: z.string().trim().min(1).max(2000),
})

export const convertLeadSchema = z.object({
  companyName:     z.string().trim().min(1).max(200).optional(),
  primaryContact:  z.object({
    name:  z.string().trim().min(1).max(100),
    email: emailField,
    phone: phoneField,
    title: z.string().trim().max(100).optional(),
  }).optional(),
  accountManager: mongoIdField.optional(),
})

export const listLeadsSchema = z.object({
  page:            z.coerce.number().min(1).default(1),
  limit:           z.coerce.number().min(1).max(100).default(20),
  status:          z.enum(LEAD_STATUSES).optional(),
  serviceInterest: z.enum(SERVICE_INTERESTS).optional(),
  assignedTo:      mongoIdField.optional(),
  search:          z.string().trim().max(200).optional(),
  sortBy:          z.enum(['createdAt', 'updatedAt', 'fullName', 'companyName']).default('createdAt'),
  sortOrder:       z.enum(['asc', 'desc']).default('desc'),
})

export type CreateLeadInput   = z.infer<typeof createLeadSchema>
export type UpdateLeadInput   = z.infer<typeof updateLeadSchema>
export type AddLeadNoteInput  = z.infer<typeof addLeadNoteSchema>
export type ConvertLeadInput  = z.infer<typeof convertLeadSchema>
export type ListLeadsInput    = z.infer<typeof listLeadsSchema>

// ── Clients ───────────────────────────────────────────────────
const contactPersonSchema = z.object({
  name:  z.string().trim().min(1).max(100),
  email: emailField,
  phone: phoneField,
  title: z.string().trim().max(100).optional(),
})

const billingAddressSchema = z.object({
  street:  z.string().trim().min(1),
  city:    z.string().trim().min(1),
  state:   z.string().trim().min(1),
  country: z.string().trim().min(1),
  zip:     z.string().trim().optional(),
}).optional()

export const createClientSchema = z.object({
  companyName:        z.string().trim().min(1).max(200),
  industry:           z.string().trim().max(100).optional(),
  companySize:        z.enum(COMPANY_SIZES).optional(),
  website:            urlField,
  primaryContact:     contactPersonSchema,
  additionalContacts: z.array(contactPersonSchema).max(10).default([]),
  status:             z.enum(CLIENT_STATUSES).default('active'),
  accountManager:     mongoIdField.optional(),
  originLeadId:       mongoIdField.optional(),
  clientSince:        dateField,
  billingEmail:       emailField.optional(),
  billingAddress:     billingAddressSchema,
  tags:               z.array(z.string().trim().max(50)).max(20).default([]),
})

export const updateClientSchema = createClientSchema.partial()

export const listClientsSchema = z.object({
  page:           z.coerce.number().min(1).default(1),
  limit:          z.coerce.number().min(1).max(100).default(20),
  status:         z.enum(CLIENT_STATUSES).optional(),
  accountManager: mongoIdField.optional(),
  search:         z.string().trim().max(200).optional(),
  sortBy:         z.enum(['createdAt', 'companyName', 'clientSince']).default('createdAt'),
  sortOrder:      z.enum(['asc', 'desc']).default('desc'),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
export type ListClientsInput  = z.infer<typeof listClientsSchema>

// ── Projects ──────────────────────────────────────────────────
export const createProjectSchema = z.object({
  title:         z.string().trim().min(1).max(200),
  description:   z.string().trim().max(2000).optional(),
  clientId:      mongoIdField,
  type:          z.enum(PROJECT_TYPES),
  priority:      z.enum(PROJECT_PRIORITIES).default('medium'),
  startDate:     dateField,
  targetEndDate: dateField,
  projectManager: mongoIdField.optional(),
  teamMembers:   z.array(mongoIdField).max(20).default([]),
  budget: z.object({
    amount:   z.number().min(0),
    currency: z.string().max(3).default('USD'),
    type:     z.enum(BUDGET_TYPES),
  }).optional(),
  tags:          z.array(z.string().trim().max(50)).max(20).default([]),
})

export const updateProjectSchema = z.object({
  title:             z.string().trim().min(1).max(200).optional(),
  description:       z.string().trim().max(2000).optional(),
  type:              z.enum(PROJECT_TYPES).optional(),
  status:            z.enum(PROJECT_STATUSES).optional(),
  priority:          z.enum(PROJECT_PRIORITIES).optional(),
  startDate:         dateField,
  targetEndDate:     dateField,
  actualEndDate:     dateField,
  projectManager:    mongoIdField.optional(),
  teamMembers:       z.array(mongoIdField).max(20).optional(),
  completionPercent: z.number().min(0).max(100).optional(),
  budget: z.object({
    amount:   z.number().min(0),
    currency: z.string().max(3).default('USD'),
    type:     z.enum(BUDGET_TYPES),
  }).optional(),
  tags:              z.array(z.string().trim().max(50)).max(20).optional(),
})

export const listProjectsSchema = z.object({
  page:           z.coerce.number().min(1).default(1),
  limit:          z.coerce.number().min(1).max(100).default(20),
  clientId:       mongoIdField.optional(),
  status:         z.enum(PROJECT_STATUSES).optional(),
  type:           z.enum(PROJECT_TYPES).optional(),
  projectManager: mongoIdField.optional(),
  search:         z.string().trim().max(200).optional(),
  sortBy:         z.enum(['createdAt', 'targetEndDate', 'title', 'status']).default('createdAt'),
  sortOrder:      z.enum(['asc', 'desc']).default('desc'),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type ListProjectsInput  = z.infer<typeof listProjectsSchema>

// ── Files ─────────────────────────────────────────────────────
export const requestUploadUrlSchema = z.object({
  originalName: z.string().trim().min(1).max(255),
  mimeType:     z.string().trim().min(1).max(100),
  sizeBytes:    z.number().int().min(1).max(50 * 1024 * 1024), // 50 MB max
  category:     z.enum(FILE_CATEGORIES),
  clientId:     mongoIdField.optional(),
  projectId:    mongoIdField.optional(),
})

export const registerFileSchema = z.object({
  storageKey:   z.string().trim().min(1),
  originalName: z.string().trim().min(1).max(255),
  mimeType:     z.string().trim().min(1).max(100),
  sizeBytes:    z.number().int().min(1),
  extension:    z.string().trim().min(1).max(20),
  category:     z.enum(FILE_CATEGORIES),
  clientId:     mongoIdField.optional(),
  projectId:    mongoIdField.optional(),
  accessLevel:  z.enum(ACCESS_LEVELS).default('internal'),
  description:  z.string().trim().max(500).optional(),
  tags:         z.array(z.string().trim().max(50)).max(20).default([]),
})

export const listFilesSchema = z.object({
  page:       z.coerce.number().min(1).default(1),
  limit:      z.coerce.number().min(1).max(100).default(20),
  clientId:   mongoIdField.optional(),
  projectId:  mongoIdField.optional(),
  category:   z.enum(FILE_CATEGORIES).optional(),
  isArchived: z.coerce.boolean().default(false),
  sortBy:     z.enum(['createdAt', 'originalName', 'sizeBytes']).default('createdAt'),
  sortOrder:  z.enum(['asc', 'desc']).default('desc'),
})

export type RequestUploadUrlInput = z.infer<typeof requestUploadUrlSchema>
export type RegisterFileInput     = z.infer<typeof registerFileSchema>
export type ListFilesInput        = z.infer<typeof listFilesSchema>
