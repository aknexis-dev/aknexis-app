import Link from 'next/link'
import { ArrowUpRight, Code2, TrendingUp, Building2 } from 'lucide-react'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'

const SERVICES = [
  {
    icon:        <Code2 className="w-6 h-6" />,
    label:       'Software Engineering',
    tagline:     'Platforms that last decades, not years.',
    description: 'Enterprise-grade custom software, API architectures, and scalable system design. We build the technical foundations that power serious business operations.',
    features:    ['Custom web & mobile platforms', 'API design & integrations', 'System architecture', 'Performance engineering'],
    href:        '/services/software-engineering',
    accent:      'accent',
  },
  {
    icon:        <TrendingUp className="w-6 h-6" />,
    label:       'Growth & Intelligence',
    tagline:     'Decisions backed by data, not instinct.',
    description: 'Analytics infrastructure, business intelligence, and digital growth systems that turn raw data into competitive advantage and measurable outcomes.',
    features:    ['Data architecture & pipelines', 'Business intelligence dashboards', 'SEO & digital acquisition', 'Conversion optimization'],
    href:        '/services/growth-intelligence',
    accent:      'teal',
  },
  {
    icon:        <Building2 className="w-6 h-6" />,
    label:       'Business Foundation',
    tagline:     'Operations that scale without friction.',
    description: 'Workflow automation, digital infrastructure, and operational systems that eliminate manual work and create the organizational capacity for serious growth.',
    features:    ['Process automation', 'Operational dashboards', 'Integration & migrations', 'Digital infrastructure'],
    href:        '/services/business-foundation',
    accent:      'slate',
  },
]

export function ServicesPreview() {
  return (
    <SectionWrapper background="none">
      <PageContainer>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel className="mb-5">Our Services</SectionLabel>
          <SectionTitle className="mb-5">
            Three pillars. One platform.
          </SectionTitle>
          <BodyText>
            We work across three interconnected domains — engineering the systems, intelligence, and operations that modern enterprises need to compete at scale.
          </BodyText>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <Link
              key={service.label}
              href={service.href}
              className="group block card-surface rounded-2xl p-8 transition-all duration-300 hover:border-accent-600/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(59,130,246,0.15)] hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                service.accent === 'accent'
                  ? 'bg-accent-600/10 border border-accent-600/20 text-accent-400 group-hover:bg-accent-600/15'
                  : service.accent === 'teal'
                  ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:bg-teal-500/15'
                  : 'bg-white/[0.05] border border-white/[0.10] text-slate-400 group-hover:bg-white/[0.08]'
              }`}>
                {service.icon}
              </div>

              {/* Content */}
              <div className="mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {`0${i + 1}`}
              </div>
              <h3 className="font-display font-700 text-xl text-slate-100 mb-2 tracking-tight">
                {service.label}
              </h3>
              <p className="text-sm font-medium text-accent-400 mb-4">{service.tagline}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-accent-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-accent-400 group-hover:text-accent-300 transition-colors duration-200">
                Learn more
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

      </PageContainer>
    </SectionWrapper>
  )
}
