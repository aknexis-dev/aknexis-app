// ============================================================
// CLIENT SERVICE — Business logic for client management
// ============================================================

import mongoose from 'mongoose'
import { connectDB }        from '@/lib/db/connection'
import { Client }           from '@/lib/db/index'
import { AppError }         from '@/lib/errors/AppError'
import { validateObjectId } from '@/lib/utils/id.util'
import { buildPaginationMeta } from '@/lib/utils/service.util'
import type {
  CreateClientInput,
  UpdateClientInput,
  ListClientsInput,
} from '@/lib/validation/schemas'
import type { IClient } from '@/lib/db/models/Client.model'

export class ClientService {
  // ── Create ─────────────────────────────────────────────────

  static async createClient(input: CreateClientInput): Promise<IClient> {
    await connectDB()

    const client = await Client.create({
      ...input,
      clientSince: input.clientSince ?? new Date(),
      notes:       [],
    })

    return client
  }

  // ── List ───────────────────────────────────────────────────

  static async listClients(input: ListClientsInput) {
    await connectDB()

    const { page, limit, status, accountManager, search, sortBy, sortOrder } = input
    const skip = (page - 1) * limit

    const filter: mongoose.FilterQuery<IClient> = { deletedAt: null }

    if (status)         filter.status         = status
    if (accountManager) {
      validateObjectId(accountManager, 'accountManager')
      filter.accountManager = accountManager
    }
    if (search) {
      filter.$or = [
        { companyName:             { $regex: search, $options: 'i' } },
        { 'primaryContact.name':   { $regex: search, $options: 'i' } },
        { 'primaryContact.email':  { $regex: search, $options: 'i' } },
      ]
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }

    const [clients, total] = await Promise.all([
      Client.find(filter)
        .populate('accountManager', 'firstName lastName email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Client.countDocuments(filter),
    ])

    return { clients, meta: buildPaginationMeta(total, page, limit) }
  }

  // ── Get one ────────────────────────────────────────────────

  static async getClientById(id: string): Promise<IClient> {
    await connectDB()
    validateObjectId(id)

    const client = await Client.findOne({ _id: id, deletedAt: null })
      .populate('accountManager', 'firstName lastName email role')
      .populate('notes.addedBy', 'firstName lastName')
      .populate('originLeadId', 'fullName email source createdAt')

    if (!client) throw AppError.notFound('Client')
    return client
  }

  // ── Update ─────────────────────────────────────────────────

  static async updateClient(id: string, input: UpdateClientInput): Promise<IClient> {
    await connectDB()
    validateObjectId(id)

    const client = await Client.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: input },
      { new: true, runValidators: true }
    ).populate('accountManager', 'firstName lastName email')

    if (!client) throw AppError.notFound('Client')
    return client
  }

  // ── Add note ───────────────────────────────────────────────

  static async addNote(clientId: string, content: string, userId: string): Promise<IClient> {
    await connectDB()
    validateObjectId(clientId, 'clientId')
    validateObjectId(userId,   'userId')

    const note = {
      _id:       new mongoose.Types.ObjectId(),
      content,
      addedBy:   new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    }

    const client = await Client.findOneAndUpdate(
      { _id: clientId, deletedAt: null },
      { $push: { notes: note } },
      { new: true }
    ).populate('notes.addedBy', 'firstName lastName')

    if (!client) throw AppError.notFound('Client')
    return client
  }

  // ── Get projects for a client ──────────────────────────────

  static async getClientProjects(clientId: string) {
    await connectDB()
    validateObjectId(clientId, 'clientId')

    // Dynamic import to avoid circular dependency
    const { Project } = await import('@/lib/db/index')

    const client = await Client.findOne({ _id: clientId, deletedAt: null }).lean()
    if (!client) throw AppError.notFound('Client')

    const projects = await Project.find({ clientId, deletedAt: null })
      .populate('projectManager', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .lean()

    return projects
  }

  // ── Soft delete ────────────────────────────────────────────

  static async deleteClient(id: string): Promise<void> {
    await connectDB()
    validateObjectId(id)

    const result = await Client.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }
    )

    if (!result) throw AppError.notFound('Client')
  }

  // ── Stats ─────────────────────────────────────────────────

  static async getClientStats() {
    await connectDB()

    const [total, active, byStatus] = await Promise.all([
      Client.countDocuments({ deletedAt: null }),
      Client.countDocuments({ deletedAt: null, status: 'active' }),
      Client.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ])

    const statusMap: Record<string, number> = {}
    byStatus.forEach((s: { _id: string; count: number }) => {
      statusMap[s._id] = s.count
    })

    return { total, active, byStatus: statusMap }
  }
}
