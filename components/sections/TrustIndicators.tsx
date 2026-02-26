import { Shield, Award, Clock, Users } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'

const STATS = [
  { value: '200+',  label: 'Enterprise projects delivered',  suffix: '' },
  { value: '98',    label: 'Client satisfaction rate',       suffix: '%' },
  { value: '12',    label: 'Years of combined experience',   suffix: '+' },
  { value: '40+',   label: 'Industries served',              suffix: '' },
]

const TRUST_SIGNALS = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Enterprise-grade security',
    description: 'SOC 2-aligned practices, encrypted data, and security-first architecture on every project.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'On-time delivery',
    description: 'Structured project management and clear milestones. We deliver what we promise, when we promise.',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Production-quality code',
    description: 'No shortcuts. Every system is built for maintainability, performance, and long-term reliability.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Long-term partnership',
    description: 'We design for the future. Our clients stay because we grow with them, not just through launch.',
  },
]

export function TrustIndicators() {
  return (
    <SectionWrapper background="surface">
      <PageContainer>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-navy-900/60 px-6 py-8 flex flex-col gap-1.5">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display font-800 text-3xl sm:text-4xl gradient-text">
                  {stat.value}
                </span>
                <span className="font-display font-700 text-xl text-accent-400">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400">
                {signal.icon}
              </div>
              <h3 className="font-display font-600 text-base text-slate-200">
                {signal.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

      </PageContainer>
    </SectionWrapper>
  )
}
