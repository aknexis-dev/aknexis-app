// ============================================================
// LEAD SERVICE — Business logic for lead management
// ============================================================

import mongoose from 'mongoose'
import { connectDB }        from '@/lib/db/connection'
import { Lead, Client }     from '@/lib/db/index'
import { AppError }         from '@/lib/errors/AppError'
import { validateObjectId } from '@/lib/utils/id.util'
import {
  buildPaginationMeta,
} from '@/lib/utils/service.util'
import type {
  CreateLeadInput,
  UpdateLeadInput,
  AddLeadNoteInput,
  ConvertLeadInput,
  ListLeadsInput,
} from '@/lib/validation/schemas'
import type { ILead } from '@/lib/db/models/Lead.model'

export class LeadService {
  // ── Create ─────────────────────────────────────────────────

  static async createLead(
    input:  CreateLeadInput,
    userId?: string
  ): Promise<ILead> {
    await connectDB()

    const lead = await Lead.create({
      ...input,
      status: 'new',
      notes:  [],
    })

    return lead
  }

  // ── List ───────────────────────────────────────────────────

  static async listLeads(input: ListLeadsInput) {
    await connectDB()

    const { page, limit, status, serviceInterest, assignedTo, search, sortBy, sortOrder } = input
    const skip = (page - 1) * limit

    // Build filter
    const filter: mongoose.FilterQuery<ILead> = { deletedAt: null }

    if (status)          filter.status          = status
    if (serviceInterest) filter.serviceInterest = serviceInterest
    if (assignedTo) {
      validateObjectId(assignedTo, 'assignedTo')
      filter.assignedTo = assignedTo
    }
    if (search) {
      filter.$or = [
        { fullName:    { $regex: search, $options: 'i' } },
        { email:       { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ]
    }

    const sortDirection = sortOrder === 'asc' ? 1 : -1
    const sort: Record<string, 1 | -1> = { [sortBy]: sortDirection }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('assignedTo', 'firstName lastName email')
        .sort(sort as any)
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ])

    return {
      leads,
      meta: buildPaginationMeta(total, page, limit),
    }
  }

  // ── Get one ────────────────────────────────────────────────

  static async getLeadById(id: string): Promise<ILead> {
    await connectDB()
    validateObjectId(id)

    const lead = await Lead.findOne({ _id: id, deletedAt: null })
      .populate('assignedTo', 'firstName lastName email role')
      .populate('notes.addedBy', 'firstName lastName')

    if (!lead) throw AppError.notFound('Lead')
    return lead
  }

  // ── Update ─────────────────────────────────────────────────

  static async updateLead(id: string, input: UpdateLeadInput): Promise<ILead> {
    await connectDB()
    validateObjectId(id)

    const lead = await Lead.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: input },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email')

    if (!lead) throw AppError.notFound('Lead')
    return lead
  }

  // ── Add note ───────────────────────────────────────────────

  static async addNote(
    leadId:   string,
    input:    AddLeadNoteInput,
    userId:   string
  ): Promise<ILead> {
    await connectDB()
    validateObjectId(leadId, 'leadId')
    validateObjectId(userId,  'userId')

    const note = {
      _id:      new mongoose.Types.ObjectId(),
      content:  input.content,
      addedBy:  new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, deletedAt: null },
      { $push: { notes: note } },
      { new: true }
    ).populate('notes.addedBy', 'firstName lastName')

    if (!lead) throw AppError.notFound('Lead')
    return lead
  }

  // ── Convert to Client ──────────────────────────────────────

  static async convertToClient(
    leadId: string,
    input:  ConvertLeadInput,
    userId: string
  ): Promise<{ lead: ILead; client: ILead }> {
    await connectDB()
    validateObjectId(leadId, 'leadId')

    const lead = await Lead.findOne({ _id: leadId, deletedAt: null })
    if (!lead) throw AppError.notFound('Lead')

    if (lead.status === 'converted') {
      throw new AppError('LEAD_ALREADY_CONVERTED', 'This lead has already been converted to a client.', 409)
    }

    // Build client from lead data + optional overrides
    const clientData = {
      companyName: input.companyName ?? lead.companyName,
      primaryContact: input.primaryContact ?? {
        name:  lead.fullName,
        email: lead.email,
        phone: lead.phone,
      },
      status:         'active' as const,
      originLeadId:   lead._id,
      accountManager: input.accountManager ?? userId,
      clientSince:    new Date(),
    }

    const client = await Client.create(clientData)

    // Update lead status
    lead.status              = 'converted'
    lead.convertedToClientId = client._id
    await lead.save()

    return { lead, client: client as unknown as ILead }
  }

  // ── Soft Delete ────────────────────────────────────────────

  static async deleteLead(id: string): Promise<void> {
    await connectDB()
    validateObjectId(id)

    const result = await Lead.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }
    )

    if (!result) throw AppError.notFound('Lead')
  }

  // ── Stats (for dashboard) ──────────────────────────────────

  static async getLeadStats() {
    await connectDB()

    const stats = await Lead.aggregate([
      { $match: { deletedAt: null } },
      {
        $group: {
          _id:   '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)

    const [total, thisMonthCount, byStatus] = await Promise.all([
      Lead.countDocuments({ deletedAt: null }),
      Lead.countDocuments({ deletedAt: null, createdAt: { $gte: thisMonth } }),
      stats,
    ])

    const statusMap: Record<string, number> = {}
    byStatus.forEach((s: { _id: string; count: number }) => {
      statusMap[s._id] = s.count
    })

    return { total, thisMonth: thisMonthCount, byStatus: statusMap }
  }
}
