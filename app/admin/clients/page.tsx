import Link from 'next/link'
import { ArrowUpRight, Plus, Search } from 'lucide-react'

const CLIENTS = [
  { id: '1', company: 'InvestCorp Group',        industry: 'Financial Services',  contact: 'Michael Torres',  email: 'm.torres@investcorp.com',  status: 'active',   projects: 3, since: '2024-03' },
  { id: '2', company: 'Meridian Health Network', industry: 'Healthcare',          contact: 'Sarah Kim',        email: 's.kim@meridian.com',       status: 'active',   projects: 2, since: '2024-05' },
  { id: '3', company: 'PulseCommerce',           industry: 'Retail & E-Commerce', contact: 'David Okafor',    email: 'd.okafor@pulse.com',        status: 'active',   projects: 4, since: '2023-11' },
  { id: '4', company: 'Ashford Logistics',       industry: 'Logistics',           contact: 'Robert Martinez', email: 'r.martinez@ashford.com',    status: 'active',   projects: 1, since: '2024-08' },
  { id: '5', company: 'Summit Property Group',   industry: 'Real Estate',         contact: 'Jennifer Walsh',  email: 'j.walsh@summit.com',        status: 'active',   projects: 2, since: '2024-01' },
  { id: '6', company: 'Crestview Manufacturing', industry: 'Manufacturing',       contact: 'Lisa Thompson',   email: 'l.thompson@crestview.com',  status: 'inactive', projects: 1, since: '2023-06' },
]

const STATUS_COLORS: Record<string, string> = {
  active:   'text-teal-400 bg-teal-500/10 border-teal-500/25',
  inactive: 'text-slate-500 bg-white/[0.04] border-white/[0.08]',
  churned:  'text-red-400 bg-red-500/10 border-red-500/25',
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-700 text-2xl text-slate-100">Clients</h1>
          <p className="text-sm text-slate-500 mt-0.5">{CLIENTS.length} total clients</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
        <input
          type="text"
          placeholder="Search clients by company or contact name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/15 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CLIENTS.map((client) => (
          <Link
            key={client.id}
            href={`/admin/clients/${client.id}`}
            className="group card-surface rounded-2xl p-6 hover:border-accent-600/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {client.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-700 text-base text-slate-200 truncate">{client.company}</h3>
                  <p className="text-xs text-slate-600">{client.industry}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-accent-400 transition-colors flex-shrink-0 mt-0.5" />
            </div>

            <div className="divider" />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600">Primary Contact</span>
                <span className="text-xs text-slate-400">{client.contact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600">Open Projects</span>
                <span className="text-xs font-semibold text-accent-400">{client.projects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600">Client Since</span>
                <span className="text-xs text-slate-400">{client.since}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border capitalize ${STATUS_COLORS[client.status] ?? ''}`}>
                {client.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
