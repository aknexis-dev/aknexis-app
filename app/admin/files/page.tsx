import { FileText, Download, Trash2, Plus, Search, File, FileImage } from 'lucide-react'

const FILES = [
  { id: '1', name: 'InvestCorp-Service-Agreement-2025.pdf', category: 'contract',    client: 'InvestCorp Group',        size: '1.2 MB', uploadedBy: 'J. Harrington', date: '2025-11-10' },
  { id: '2', name: 'PulseCommerce-Analytics-Report-Q3.pdf', category: 'report',      client: 'PulseCommerce',           size: '4.8 MB', uploadedBy: 'E. Park',       date: '2025-11-08' },
  { id: '3', name: 'Meridian-Automation-Proposal-v2.pdf',   category: 'proposal',    client: 'Meridian Health Network', size: '2.1 MB', uploadedBy: 'M. Chen',       date: '2025-11-05' },
  { id: '4', name: 'Ashford-Tracking-Platform-Wireframes.png', category: 'design',   client: 'Ashford Logistics',       size: '8.4 MB', uploadedBy: 'J. Harrington', date: '2025-11-03' },
  { id: '5', name: 'Summit-Deal-System-Requirements.pdf',   category: 'deliverable', client: 'Summit Property Group',   size: '0.9 MB', uploadedBy: 'M. Chen',       date: '2025-10-30' },
  { id: '6', name: 'Crestview-Invoice-2025-10.pdf',         category: 'invoice',     client: 'Crestview Manufacturing', size: '0.3 MB', uploadedBy: 'Admin',          date: '2025-10-28' },
]

const CATEGORY_COLORS: Record<string, string> = {
  contract:    'text-accent-400 bg-accent-600/10 border-accent-600/25',
  report:      'text-teal-400 bg-teal-500/10 border-teal-500/25',
  proposal:    'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
  design:      'text-purple-400 bg-purple-500/10 border-purple-500/25',
  deliverable: 'text-green-400 bg-green-500/10 border-green-500/25',
  invoice:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  other:       'text-slate-400 bg-white/[0.04] border-white/[0.08]',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function FileIcon({ name }: { name: string }) {
  if (name.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
    return <FileImage className="w-5 h-5 text-purple-400" />
  }
  return <FileText className="w-5 h-5 text-accent-400" />
}

export default function FilesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-700 text-2xl text-slate-100">Files & Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">{FILES.length} files stored</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0">
          <Plus className="w-4 h-4" />
          Upload File
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
        <input
          type="text"
          placeholder="Search files by name, client, or category..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.10] rounded-xl text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/15 transition-all duration-200"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Contracts', 'Proposals', 'Reports', 'Designs', 'Deliverables', 'Invoices'].map((cat, i) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              i === 0
                ? 'bg-accent-600/15 text-accent-400 border border-accent-600/30'
                : 'text-slate-600 border border-white/[0.07] hover:text-slate-300 hover:border-white/[0.14]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card-surface rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['File', 'Client', 'Category', 'Size', 'Uploaded By', 'Date', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-2xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {FILES.map((file) => (
                <tr key={file.id} className="hover:bg-white/[0.02] transition-colors duration-150 group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                        <FileIcon name={file.name} />
                      </div>
                      <span className="text-sm text-slate-300 max-w-[200px] truncate" title={file.name}>
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-500">{file.client}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border capitalize ${CATEGORY_COLORS[file.category] ?? ''}`}>
                      {file.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-600 whitespace-nowrap">{file.size}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-600">{file.uploadedBy}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-600 whitespace-nowrap">{formatDate(file.date)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-1.5 rounded-lg text-slate-600 hover:text-accent-400 hover:bg-accent-600/10 transition-all duration-200" aria-label="Download">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200" aria-label="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
