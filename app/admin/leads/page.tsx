import Link from 'next/link'
import { ArrowUpRight, Plus, Search, Filter } from 'lucide-react'

const LEADS = [
  { id: '1', name: 'Alexandra Chen',   company: 'TechCorp Industries',    email: 'a.chen@techcorp.com',    service: 'Software Engineering',  status: 'new',        date: '2025-11-20' },
  { id: '2', name: 'Michael Torres',   company: 'InvestGroup Partners',   email: 'm.torres@investgp.com',  service: 'Growth & Intelligence', status: 'contacted',  date: '2025-11-20' },
  { id: '3', name: 'Sarah Kim',        company: 'Meridian Healthcare',    email: 's.kim@meridian.com',     service: 'Business Foundation',   status: 'qualified',  date: '2025-11-19' },
  { id: '4', name: 'David Okafor',     company: 'PulseCommerce Ltd',      email: 'd.okafor@pulse.com',     service: 'Software Engineering',  status: 'new',        date: '2025-11-19' },
  { id: '5', name: 'Jennifer Walsh',   company: 'Summit Property Group',  email: 'j.walsh@summit.com',     service: 'Business Foundation',   status: 'contacted',  date: '2025-11-18' },
  { id: '6', name: 'Robert Martinez',  company: 'Ashford Logistics',      email: 'r.martinez@ashford.com', service: 'Growth & Intelligence', status: 'qualified',  date: '2025-11-17' },
  { id: '7', name: 'Lisa Thompson',    company: 'Crestview Manufacturing', email: 'l.thompson@crestview.com',service: 'Business Foundation',  status: 'proposal_sent', date: '2025-11-15' },
  { id: '8', name: 'James O\'Brien',   company: 'National Finance Group', email: 'j.obrien@natfin.com',    service: 'Software Engineering',  status: 'converted',  date: '2025-11-10' },
]

const STATUS_COLORS: Record<string, string> = {
  new:           'text-accent-400 bg-accent-600/10 border-accent-600/25',
  contacted:     'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
  qualified:     'text-teal-400 bg-teal-500/10 border-teal-500/25',
  proposal_sent: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
  converted:     'text-green-400 bg-green-500/10 border-green-500/25',
  lost:          'text-slate-500 bg-white/[0.04] border-white/[0.08]',
  spam:          'text-red-400 bg-red-500/10 border-red-500/25',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-700 text-2xl text-slate-100">Leads</h1>
          <p className="text-sm text-slate-500 mt-0.5">{LEADS.length} total leads</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)] flex-shrink-0">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input
            type="text"
            placeholder="Search leads by name, company, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/15 transition-all duration-200"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:border-white/[0.18] transition-all duration-200 flex-shrink-0">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted'].map((tab, i) => (
          <button
            key={tab}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              i === 0
                ? 'bg-accent-600/15 text-accent-400 border border-accent-600/30'
                : 'text-slate-600 border border-white/[0.07] hover:text-slate-300 hover:border-white/[0.14]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card-surface rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Contact', 'Company', 'Service Interest', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-2xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors duration-150 group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{lead.name}</p>
                        <p className="text-xs text-slate-600">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-400">{lead.company}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-500">{lead.service}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border capitalize whitespace-nowrap ${STATUS_COLORS[lead.status] ?? ''}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-600 whitespace-nowrap">{formatDate(lead.date)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-accent-400 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      View <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
          <p className="text-xs text-slate-600">Showing 1–8 of 8 leads</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${
                  p === 1
                    ? 'bg-accent-600/15 text-accent-400 border border-accent-600/25'
                    : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
