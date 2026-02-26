import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_NAME, SITE_EMAIL, SITE_PHONE, SITE_ADDRESS } from '@/lib/navigation.config'

const FOOTER_SERVICES = [
  { label: 'Software Engineering',  href: '/services/software-engineering' },
  { label: 'Growth & Intelligence', href: '/services/growth-intelligence' },
  { label: 'Business Foundation',   href: '/services/business-foundation' },
]

const FOOTER_COMPANY = [
  { label: 'About',        href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Industries',   href: '/industries' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Careers',      href: '/careers' },
  { label: 'Insights',     href: '/insights' },
]

const FOOTER_LEGAL = [
  { label: 'Privacy Policy',  href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy',   href: '/cookies' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-950">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-accent-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-accent-600 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-display font-800 text-xl text-slate-50">{SITE_NAME}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Enterprise software architecture and technology consulting for ambitious businesses building for long-term scale.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-accent-400 transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-slate-600 group-hover:text-accent-500 transition-colors" />
                {SITE_EMAIL}
              </a>
              <a
                href={`tel:${SITE_PHONE.replace(/\D/g, '')}`}
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-accent-400 transition-colors duration-200 group"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-slate-600 group-hover:text-accent-500 transition-colors" />
                {SITE_PHONE}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4 flex-shrink-0 text-slate-600" />
                {SITE_ADDRESS}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.1em] mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.1em] mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.1em] mb-4">
              Start a Project
            </h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Ready to build something that lasts? Let us talk about your goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/25 hover:border-accent-600/40 text-accent-400 text-sm font-medium rounded-xl transition-all duration-200 group"
            >
              Book Consultation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {currentYear} {SITE_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {FOOTER_LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
