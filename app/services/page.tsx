import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Code2, TrendingUp, Building2, CheckCircle2 } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.services.title,
  description: SITE_METADATA.pages.services.description,
}

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery',       desc: 'Deep-dive into your business, operations, and goals. We learn before we prescribe.' },
  { step: '02', title: 'Architecture',    desc: 'Design the technical and operational blueprint before a single line of code is written.' },
  { step: '03', title: 'Build & Iterate', desc: 'Structured sprints with clear milestones. Progress you can see and measure throughout.' },
  { step: '04', title: 'Launch & Scale',  desc: 'Go live with confidence. We stay through launch and remain engaged for long-term growth.' },
]

const SERVICES = [
  {
    icon:  <Code2 className="w-7 h-7" />,
    label: 'Software Engineering',
    tagline: 'Systems that power serious business.',
    description: 'We design and build enterprise software platforms, APIs, and technical infrastructure for businesses that cannot afford to get it wrong. From greenfield SaaS products to mission-critical internal systems.',
    capabilities: [
      'Custom web & mobile applications',
      'API design, development & documentation',
      'System architecture & technical consulting',
      'Legacy system modernization',
      'Performance engineering & scaling',
      'DevOps, CI/CD & cloud infrastructure',
    ],
    href: '/services/software-engineering',
    index: '01',
  },
  {
    icon:  <TrendingUp className="w-7 h-7" />,
    label: 'Growth & Intelligence',
    tagline: 'Turn your data into your competitive edge.',
    description: 'We build the analytics and growth infrastructure that transforms raw business data into clarity, strategy, and measurable results. Decision-making backed by intelligence, not gut instinct.',
    capabilities: [
      'Data warehouse & pipeline architecture',
      'Business intelligence dashboards',
      'SEO strategy & organic growth systems',
      'Conversion rate optimization',
      'Marketing analytics & attribution',
      'Predictive modeling & forecasting',
    ],
    href: '/services/growth-intelligence',
    index: '02',
  },
  {
    icon:  <Building2 className="w-7 h-7" />,
    label: 'Business Foundation',
    tagline: 'Build the operations your growth demands.',
    description: 'We design and implement the operational infrastructure that enables businesses to scale without friction. Automation, integrations, and systems that handle complexity so your team doesn\'t have to.',
    capabilities: [
      'Workflow automation & process engineering',
      'Systems integration & API connections',
      'Data migration & consolidation',
      'Operational dashboards & reporting',
      'Digital document & contract management',
      'Business systems consulting',
    ],
    href: '/services/business-foundation',
    index: '03',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Our Services</SectionLabel>
            <SectionTitle className="mb-6">
              The complete technology ecosystem for modern enterprise.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              We operate across three interconnected domains — engineering the systems, intelligence, and operations that serious businesses need to compete and scale at the national level.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Service pillars */}
      <SectionWrapper>
        <PageContainer>
          <div className="flex flex-col gap-12">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.label}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400">
                      {svc.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-600 font-mono">{svc.index}</span>
                  </div>
                  <h2 className="font-display font-700 text-3xl text-slate-100 mb-2 tracking-tight">
                    {svc.label}
                  </h2>
                  <p className="text-accent-400 font-medium mb-5">{svc.tagline}</p>
                  <p className="text-slate-400 leading-relaxed mb-7">{svc.description}</p>
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/25 hover:border-accent-600/40 text-accent-400 text-sm font-semibold rounded-xl transition-all duration-200 group"
                  >
                    Explore {svc.label}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>

                {/* Capabilities card */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="card-surface rounded-2xl p-7">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-5">
                      Capabilities
                    </p>
                    <ul className="flex flex-col gap-3">
                      {svc.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel className="mb-4">Our Process</SectionLabel>
            <SectionTitle className="mb-4">How we work.</SectionTitle>
            <BodyText>
              Every engagement follows the same disciplined process. No shortcuts, no ambiguity, no surprises.
            </BodyText>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />

            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col gap-4 text-center items-center">
                <div className="relative w-20 h-20 rounded-2xl card-surface flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-800 text-2xl gradient-text">{step.step}</span>
                </div>
                <h3 className="font-display font-700 text-base text-slate-200">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Which service fits your goals?" subtitle="Every engagement starts with a discovery call — a genuine conversation about your business, not a sales pitch." primaryLabel="Book a Discovery Call" />
    </>
  )
}
