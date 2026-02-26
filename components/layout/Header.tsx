'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { NAV_ITEMS, SITE_NAME } from '@/lib/navigation.config'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeDropdown, setActive]   = useState<string | null>(null)
  const pathname                      = usePathname()
  const dropdownRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActive(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-350',
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-accent-600 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-shadow duration-300">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-display font-800 text-xl text-slate-50 tracking-tight">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {NAV_ITEMS.filter(i => i.label !== 'Home').map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActive(item.label)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-slate-50'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                      <div className="glass-elevated rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors duration-150 group"
                          >
                            <span className="text-sm font-medium text-slate-100 group-hover:text-white transition-colors">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Mobile trigger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] group"
              >
                Book Consultation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-350',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-350',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-navy-900 border-l border-white/[0.07] shadow-[−20px_0_60px_rgba(0,0,0,0.5)]',
            'transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
              </div>
              <span className="font-display font-800 text-lg text-slate-50">{SITE_NAME}</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="p-4 flex flex-col gap-1 overflow-y-auto">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200',
                    pathname === item.href
                      ? 'bg-accent-600/10 text-accent-400 border border-accent-600/20'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-white/[0.05]'
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4 text-slate-500" />}
                </Link>

                {item.children && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/[0.06] bg-navy-900">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Book a Free Consultation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
