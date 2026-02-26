import Link from 'next/link'
import { ArrowUpRight, Plus, Calendar } from 'lucide-react'

const PROJECTS = [
  { id: '1', title: 'Core Operations Platform Rebuild',   client: 'InvestCorp Group',        type: 'Software Engineering',  status: 'active',    progress: 65, due: '2025-12-15', manager: 'J. Harrington' },
  { id: '2', title: 'Analytics & BI Dashboard System',   client: 'PulseCommerce',            type: 'Growth & Intelligence', status: 'active',    progress: 82, due: '2025-11-30', manager: 'E. Park' },
  { id: '3', title: 'Workflow Automation — Phase 1',      client: 'Meridian Health Network', type: 'Business Foundation',   status: 'completed', progress: 100, due: '2025-10-01', manager: 'M. Chen' },
  { id: '4', title: 'Shipment Tracking Platform',         client: 'Ashford Logistics',       type: 'Software Engineering',  status: 'active',    progress: 40, due: '2026-01-20', manager: 'J. Harrington' },
  { id: '5', title: 'Deal Management System',             client: 'Summit Property Group',   type: 'Business Foundation',   status: 'scoping',   progress: 10, due: '2026-02-01', manager: 'M. Chen' },
  { id: '6', title: 'SEO & Content Intelligence',         client: 'PulseCommerce',           type: 'Growth & Intelligence', status: 'on_hold',   progress: 55, due: '2026-01-05', manager: 'E. Park' },
]

const STATUS_COLORS: Record<string, string> = {
  active:    'text-accent-400 bg-accent-600/10 border-accent-600/25',
  scoping:   'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
  on_hold:   'text-orange-400 bg-orange-500/10 border-orange-500/25',
  completed: 'text-teal-400 bg-teal-500/10 border-teal-500/25',
  cancelled: 'text-red-400 bg-red-500/10 border-red-500/25',
}

const TYPE_COLORS: Record<string, string> = {
  'Software Engineering':  'text-accent-400',
  'Growth & Intelligence': 'text-teal-400',
  'Business Foundation':   'text-slate-400',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-700 text-2xl text-slate-100">Projects</h1>
          <p className="text-sm text-slate-500 mt-0.5">{PROJECTS.length} total projects</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/admin/projects/${project.id}`}
            className="group card-surface rounded-2xl p-5 hover:border-accent-600/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-700 text-base text-slate-200 truncate group-hover:text-slate-100 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span>{project.client}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <span className={TYPE_COLORS[project.type]}>{project.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <span>{project.manager}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="sm:w-36 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Progress</span>
                  <span className={`font-semibold ${project.progress === 100 ? 'text-teal-400' : 'text-accent-400'}`}>
                    {project.progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      project.progress === 100 ? 'bg-teal-500' : 'bg-accent-600'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Due date */}
              <div className="sm:w-32 flex items-center gap-1.5 text-xs text-slate-600">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(project.due)}</span>
              </div>

              {/* Status + arrow */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border capitalize whitespace-nowrap ${STATUS_COLORS[project.status] ?? ''}`}>
                  {project.status.replace('_', ' ')}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-accent-400 transition-colors flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
