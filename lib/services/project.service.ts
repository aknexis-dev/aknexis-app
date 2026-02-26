// ============================================================
// PROJECT SERVICE — Business logic for project management
// ============================================================

import mongoose from 'mongoose'
import { connectDB }        from '@/lib/db/connection'
import { Project, Client }  from '@/lib/db/index'
import { AppError }         from '@/lib/errors/AppError'
import { validateObjectId } from '@/lib/utils/id.util'
import { buildPaginationMeta } from '@/lib/utils/service.util'
import type {
  CreateProjectInput,
  UpdateProjectInput,
  ListProjectsInput,
} from '@/lib/validation/schemas'
import type { IProject } from '@/lib/db/models/Project.model'

export class ProjectService {
  // ── Create ─────────────────────────────────────────────────

  static async createProject(input: CreateProjectInput): Promise<IProject> {
    await connectDB()
    validateObjectId(input.clientId, 'clientId')

    // Verify client exists
    const client = await Client.findOne({ _id: input.clientId, deletedAt: null })
    if (!client) throw AppError.notFound('Client')

    const project = await Project.create({
      ...input,
      status: 'scoping',
      completionPercent: 0,
      milestones: [],
      notes: [],
    })

    return project.populate('projectManager', 'firstName lastName email')
  }

  // ── List ───────────────────────────────────────────────────

  static async listProjects(input: ListProjectsInput) {
    await connectDB()

    const { page, limit, clientId, status, type, projectManager, search, sortBy, sortOrder } = input
    const skip = (page - 1) * limit

    const filter: mongoose.FilterQuery<IProject> = { deletedAt: null }

    if (clientId) {
      validateObjectId(clientId, 'clientId')
      filter.clientId = clientId
    }
    if (status)         filter.status         = status
    if (type)           filter.type           = type
    if (projectManager) {
      validateObjectId(projectManager, 'projectManager')
      filter.projectManager = projectManager
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .populate('clientId', 'companyName primaryContact.name status')
        .populate('projectManager', 'firstName lastName email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(filter),
    ])

    return { projects, meta: buildPaginationMeta(total, page, limit) }
  }

  // ── Get one ────────────────────────────────────────────────

  static async getProjectById(id: string): Promise<IProject> {
    await connectDB()
    validateObjectId(id)

    const project = await Project.findOne({ _id: id, deletedAt: null })
      .populate('clientId', 'companyName primaryContact industry status')
      .populate('projectManager', 'firstName lastName email role')
      .populate('teamMembers', 'firstName lastName email role')
      .populate('notes.addedBy', 'firstName lastName')

    if (!project) throw AppError.notFound('Project')
    return project
  }

  // ── Update ─────────────────────────────────────────────────

  static async updateProject(id: string, input: UpdateProjectInput): Promise<IProject> {
    await connectDB()
    validateObjectId(id)

    // Status transition validation
    if (input.status) {
      const project = await Project.findOne({ _id: id, deletedAt: null }).select('status')
      if (!project) throw AppError.notFound('Project')
      validateStatusTransition(project.status, input.status)
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: input },
      { new: true, runValidators: true }
    )
      .populate('clientId', 'companyName')
      .populate('projectManager', 'firstName lastName email')

    if (!project) throw AppError.notFound('Project')
    return project
  }

  // ── Add note ───────────────────────────────────────────────

  static async addNote(projectId: string, content: string, userId: string): Promise<IProject> {
    await connectDB()
    validateObjectId(projectId, 'projectId')
    validateObjectId(userId,    'userId')

    const note = {
      _id:       new mongoose.Types.ObjectId(),
      content,
      addedBy:   new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId, deletedAt: null },
      { $push: { notes: note } },
      { new: true }
    ).populate('notes.addedBy', 'firstName lastName')

    if (!project) throw AppError.notFound('Project')
    return project
  }

  // ── Soft delete ────────────────────────────────────────────

  static async deleteProject(id: string): Promise<void> {
    await connectDB()
    validateObjectId(id)

    const result = await Project.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }
    )

    if (!result) throw AppError.notFound('Project')
  }

  // ── Stats ─────────────────────────────────────────────────

  static async getProjectStats() {
    await connectDB()

    const [total, active, byStatus, dueSoon] = await Promise.all([
      Project.countDocuments({ deletedAt: null }),
      Project.countDocuments({ deletedAt: null, status: 'active' }),
      Project.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      // Projects due within next 14 days
      Project.countDocuments({
        deletedAt: null,
        status: { $in: ['active', 'scoping'] },
        targetEndDate: {
          $lte: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          $gte: new Date(),
        },
      }),
    ])

    const statusMap: Record<string, number> = {}
    byStatus.forEach((s: { _id: string; count: number }) => {
      statusMap[s._id] = s.count
    })

    return { total, active, dueSoon, byStatus: statusMap }
  }
}

// ── Status transition rules ──────────────────────────────────

type ProjectStatus = 'scoping' | 'proposal' | 'active' | 'on_hold' | 'completed' | 'cancelled'

const ALLOWED_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  scoping:   ['proposal', 'cancelled'],
  proposal:  ['active', 'scoping', 'cancelled'],
  active:    ['on_hold', 'completed', 'cancelled'],
  on_hold:   ['active', 'cancelled'],
  completed: [],
  cancelled: [],
}

function validateStatusTransition(from: string, to: string): void {
  const allowed = ALLOWED_TRANSITIONS[from as ProjectStatus]
  if (!allowed) return // Unknown status, allow (schema validates)

  if (!allowed.includes(to as ProjectStatus)) {
    throw new AppError(
      'INVALID_STATUS_TRANSITION',
      `Cannot transition project from '${from}' to '${to}'.`,
      409
    )
  }
}
