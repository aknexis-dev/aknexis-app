// ============================================================
// DASHBOARD SERVICE — Aggregate stats for admin overview
// ============================================================

import { connectDB }   from '@/lib/db/connection'
import { Lead, Client, Project, File } from '@/lib/db/index'

export interface DashboardStats {
  leads: {
    total:      number
    thisMonth:  number
    new:        number
    byStatus:   Record<string, number>
  }
  clients: {
    total:      number
    active:     number
    byStatus:   Record<string, number>
  }
  projects: {
    total:      number
    active:     number
    dueSoon:    number
    byStatus:   Record<string, number>
  }
  files: {
    total:           number
    totalStorageBytes: number
  }
  recentLeads:    RecentLead[]
  conversionRate: number
}

export interface RecentLead {
  _id:             string
  fullName:        string
  email:           string
  companyName:     string
  serviceInterest: string
  status:          string
  createdAt:       string
}

export class DashboardService {
  static async getStats(): Promise<DashboardStats> {
    await connectDB()

    const now       = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const twoWeeks  = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

    // Run all aggregations in parallel for performance
    const [
      leadTotal, leadThisMonth, leadNew,
      leadByStatus,
      clientTotal, clientActive,
      clientByStatus,
      projectTotal, projectActive, projectDueSoon,
      projectByStatus,
      fileTotal, fileTotalBytes,
      convertedLeads,
      recentLeads,
    ] = await Promise.all([
      Lead.countDocuments({ deletedAt: null }),
      Lead.countDocuments({ deletedAt: null, createdAt: { $gte: monthStart } }),
      Lead.countDocuments({ deletedAt: null, status: 'new' }),

      Lead.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      Client.countDocuments({ deletedAt: null }),
      Client.countDocuments({ deletedAt: null, status: 'active' }),

      Client.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      Project.countDocuments({ deletedAt: null }),
      Project.countDocuments({ deletedAt: null, status: 'active' }),
      Project.countDocuments({
        deletedAt: null,
        status: { $in: ['active', 'scoping'] },
        targetEndDate: { $lte: twoWeeks, $gte: now },
      }),

      Project.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      File.countDocuments({ deletedAt: null, isArchived: false }),

      File.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: null, total: { $sum: '$sizeBytes' } } },
      ]),

      Lead.countDocuments({ deletedAt: null, status: 'converted' }),

      Lead.find({ deletedAt: null })
        .sort({ createdAt: -1 })
        .limit(8)
        .select('fullName email companyName serviceInterest status createdAt')
        .lean(),
    ])

    // Build status maps
    const toStatusMap = (arr: Array<{ _id: string; count: number }>) => {
      const map: Record<string, number> = {}
      arr.forEach((s) => { map[s._id] = s.count })
      return map
    }

    const conversionRate = leadTotal > 0
      ? Math.round((convertedLeads / leadTotal) * 100)
      : 0

    return {
      leads: {
        total:     leadTotal,
        thisMonth: leadThisMonth,
        new:       leadNew,
        byStatus:  toStatusMap(leadByStatus as Array<{ _id: string; count: number }>),
      },
      clients: {
        total:    clientTotal,
        active:   clientActive,
        byStatus: toStatusMap(clientByStatus as Array<{ _id: string; count: number }>),
      },
      projects: {
        total:    projectTotal,
        active:   projectActive,
        dueSoon:  projectDueSoon,
        byStatus: toStatusMap(projectByStatus as Array<{ _id: string; count: number }>),
      },
      files: {
        total:             fileTotal,
        totalStorageBytes: (fileTotalBytes[0] as { total?: number } | undefined)?.total ?? 0,
      },
      recentLeads: (recentLeads as unknown[]).map((l) => {
        const lead = l as {
          _id: { toString(): string }
          fullName: string
          email: string
          companyName: string
          serviceInterest: string
          status: string
          createdAt: Date
        }
        return {
          _id:             lead._id.toString(),
          fullName:        lead.fullName,
          email:           lead.email,
          companyName:     lead.companyName,
          serviceInterest: lead.serviceInterest,
          status:          lead.status,
          createdAt:       lead.createdAt.toISOString(),
        }
      }),
      conversionRate,
    }
  }
}
