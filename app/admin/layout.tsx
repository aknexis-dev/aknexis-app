'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Briefcase, FolderOpen, FileText,
  Menu, X, LogOut, Bell, ChevronRight, Settings
} from 'lucide-react'
import { SITE_NAME } from '@/lib/navigation.config'
import { cn } from '@/lib/utils/cn'

const SIDEBAR_ITEMS = [
  { label: 'Overview',  href: '/admin',          icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Leads',     href: '/admin/leads',     icon: <Users className="w-4 h-4" />,     badge: '12' },
  { label: 'Clients',   href: '/admin/clients',   icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Projects',  href: '/admin/projects',  icon: <FolderOpen className="w-4 h-4" /> },
  { label: 'Files',     href: '/admin/files',     icon: <FileText className="w-4 h-4" /> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-60 z-50 flex flex-col',
          'bg-navy-900 border-r border-white/[0.06]',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'lg:translate-x-0 lg:relative lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/[0.06] flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-600 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.4)]">
              <div className="w-2.5 h-2.5 bg-white rounded-sm" />
            </div>
            <span className="font-display font-800 text-base text-slate-50">{SITE_NAME}</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-300 transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          <p className="text-2xs font-semibold text-slate-700 uppercase tracking-widest px-3 mb-2">Navigation</p>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-accent-600/15 text-accent-300 border border-accent-600/25'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.05]'
                )}
              >
                <span className={isActive ? 'text-accent-400' : 'text-slate-600 group-hover:text-slate-400 transition-colors'}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-2xs font-bold bg-accent-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-accent-500" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-white/[0.06] flex flex-col gap-1">
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-all duration-200">
            <Settings className="w-4 h-4 text-slate-600" />
            Settings
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full text-left">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          {/* User chip */}
          <div className="flex items-center gap-3 mt-2 px-3 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-300 truncate">Admin User</p>
              <p className="text-2xs text-slate-600 truncate">admin@aknexis.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="h-16 flex-shrink-0 flex items-center gap-4 px-6 bg-navy-900/80 backdrop-blur-sm border-b border-white/[0.06] sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb area */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-400 truncate">
              {SIDEBAR_ITEMS.find(i => pathname === i.href || (i.href !== '/admin' && pathname.startsWith(i.href)))?.label ?? 'Dashboard'}
            </p>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-slate-600 hover:text-slate-400 transition-colors px-2 py-1 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
            >
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
