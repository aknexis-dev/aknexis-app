import { Users, Briefcase, FolderOpen, TrendingUp, ArrowUpRight, Clock } from 'lucide-react'
import Link from 'next/link'

const STATS = [
  { label: 'New Leads',       value: '12', change: '+4 this week',  icon: <Users className="w-5 h-5" />,      href: '/admin/leads',    accent: 'accent' },
  { label: 'Active Clients',  value: '48', change: '+2 this month', icon: <Briefcase className="w-5 h-5" />,  href: '/admin/clients',  accent: 'teal' },
  { label: 'Open Projects',   value: '31', change: '5 due soon',    icon: <FolderOpen className="w-5 h-5" />, href: '/admin/projects', accent: 'slate' },
  { label: 'Conversion Rate', value: '68%',change: '+3% vs last mo',icon: <TrendingUp className="w-5 h-5" />, href: '/admin/leads',    accent: 'accent' },
]

const RECENT_LEADS = [
  { name: 'Alexandra Chen',  company: 'TechCorp Industries',  service: 'Software Engineering',  status: 'new',        date: '2 hours ago' },
  { name: 'Michael Torres',  company: 'InvestGroup Partners', service: 'Growth & Intelligence', status: 'contacted',  date: '5 hours ago' },
  { name: 'Sarah Kim',       company: 'Meridian Healthcare',  service: 'Business Foundation',   status: 'qualified',  date: '1 day ago' },
  { name: 'David Okafor',    company: 'PulseCommerce Ltd',    service: 'Software Engineering',  status: 'new',        date: '1 day ago' },
  { name: 'Jennifer Walsh',  company: 'Summit Property',      service: 'Business Foundation',   status: 'contacted',  date: '2 days ago' },
]

const STATUS_COLORS: Record<string, string> = {
  new:       'text-accent-400 bg-accent-600/10 border-accent-600/25',
  contacted: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
  qualified: 'text-teal-400 bg-teal-500/10 border-teal-500/25',
  converted: 'text-green-400 bg-green-500/10 border-green-500/25',
  lost:      'text-slate-500 bg-white/[0.04] border-white/[0.08]',
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl">

      {/* Page header */}
      <div>
        <h1 className="font-display font-700 text-2xl text-slate-100 mb-1">Good morning 👋</h1>
        <p className="text-sm text-slate-500">Here's what's happening across your platform today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group card-surface rounded-2xl p-5 hover:border-accent-600/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                stat.accent === 'accent' ? 'bg-accent-600/10 border border-accent-600/20 text-accent-400' :
                stat.accent === 'teal'   ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400' :
                                           'bg-white/[0.05] border border-white/[0.10] text-slate-400'
              }`}>
                {stat.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-slate-500 transition-colors" />
            </div>
            <div className="font-display font-800 text-3xl gradient-text mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="text-xs text-slate-700 mt-1">{stat.change}</div>
          </Link>
        ))}
      </div>

      {/* Recent leads table */}
      <div className="card-surface rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="font-display font-700 text-base text-slate-200">Recent Leads</h2>
            <p className="text-xs text-slate-600 mt-0.5">Latest inquiries from your website</p>
          </div>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-300 transition-colors"
          >
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['Contact', 'Company', 'Service Interest', 'Status', 'Received'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-2xs font-semibold text-slate-700 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {RECENT_LEADS.map((lead) => (
                <tr key={lead.name} className="hover:bg-white/[0.02] transition-colors duration-150 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-2xs font-bold flex-shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{lead.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{lead.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border capitalize ${STATUS_COLORS[lead.status] ?? ''}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock className="w-3 h-3" />
                      {lead.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Add New Lead',   href: '/admin/leads',    desc: 'Manually create a lead record' },
          { label: 'Create Client',  href: '/admin/clients',  desc: 'Add a new client profile' },
          { label: 'Start Project',  href: '/admin/projects', desc: 'Create a new project' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center justify-between px-5 py-4 card-surface rounded-xl hover:border-accent-600/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">{action.label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{action.desc}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-accent-400 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

    </div>
  )
}
