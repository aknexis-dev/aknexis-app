import Link from 'next/link'
import { ArrowUpRight, Shield, Zap, Globe } from 'lucide-react'

const TRUST_PILLS = [
  { icon: <Shield className="w-3 h-3" />, label: 'Enterprise-grade security' },
  { icon: <Zap className="w-3 h-3" />,    label: 'Built to scale' },
  { icon: <Globe className="w-3 h-3" />,  label: 'National reach' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-glow opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-accent-600/10 border border-accent-600/20 rounded-full animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-semibold text-accent-400 tracking-widest uppercase">
              Enterprise Technology Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-800 tracking-tight text-balance leading-[1.04] text-slate-50 mb-6 animate-fade-up"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Launch Your Fully{' '}
            <span className="gradient-text">Compliant Business.</span>{' '}
            Without Legal or {' '}
            <span className="gradient-text">Technical Confusion.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up delay-150">
            Aknexis delivers enterprise-grade technology architecture, intelligent growth systems, and operational infrastructure for national businesses ready to lead their market.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-up delay-300">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.4)] group"
            >
              Book a Consultation
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 font-semibold text-base rounded-xl border border-white/[0.09] hover:border-white/[0.16] transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-450">
            {TRUST_PILLS.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.07] rounded-full text-xs font-medium text-slate-500"
              >
                <span className="text-accent-500">{pill.icon}</span>
                {pill.label}
              </div>
            ))}
          </div>

        </div>

        {/* Dashboard preview card */}
        <div className="mt-20 relative animate-fade-up delay-450">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />
          <div className="glass rounded-3xl border border-white/[0.08] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                {['bg-red-500/50', 'bg-yellow-500/50', 'bg-green-500/50'].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white/[0.04] border border-white/[0.07] rounded-md text-xs text-slate-600 font-mono">
                  aknexis.io/dashboard
                </div>
              </div>
            </div>

            {/* Fake dashboard content */}
            <div className="p-6 bg-navy-900/60 min-h-[260px] grid grid-cols-4 gap-4">
              {/* Sidebar */}
              <div className="col-span-1 hidden sm:flex flex-col gap-2">
                {['Dashboard', 'Leads', 'Clients', 'Projects', 'Files'].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-xs font-medium ${
                      i === 0
                        ? 'bg-accent-600/20 text-accent-400 border border-accent-600/25'
                        : 'text-slate-600'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-4 sm:col-span-3 flex flex-col gap-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Active Clients', value: '48', color: 'text-accent-400' },
                    { label: 'Projects',        value: '127', color: 'text-teal-400' },
                    { label: 'Leads This Month',value: '36', color: 'text-slate-200' },
                  ].map((stat) => (
                    <div key={stat.label} className="card-surface rounded-xl p-3">
                      <p className={`text-xl font-display font-800 ${stat.color}`}>{stat.value}</p>
                      <p className="text-2xs text-slate-600 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Table skeleton */}
                <div className="card-surface rounded-xl p-4 flex flex-col gap-3">
                  <div className="h-2 w-24 bg-white/[0.06] rounded-full" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="w-6 h-6 rounded-full bg-accent-600/20 flex-shrink-0" />
                      <div className="flex-1 h-2 bg-white/[0.04] rounded-full" />
                      <div className="w-12 h-2 bg-white/[0.04] rounded-full" />
                      <div className="w-16 h-5 rounded-full bg-accent-600/10 border border-accent-600/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent-600/15 blur-[60px] rounded-full" />
        </div>

      </div>
    </section>
  )
}
