import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.caseStudies.title,
  description: SITE_METADATA.pages.caseStudies.description,
}

const FILTERS = ['All', 'Software Engineering', 'Growth & Intelligence', 'Business Foundation']

const CASE_STUDIES = [
  {
    client:   'InvestCorp Group',
    industry: 'Financial Services',
    service:  'Software Engineering',
    headline: 'Rebuilt a 15-year-old core operations platform — delivered in 6 months.',
    summary:  'InvestCorp\'s legacy platform was a bottleneck across every department. We re-architected the entire system using a modern microservices approach, delivered in parallel with zero business disruption.',
    metrics:  [{ value: '74%', label: 'faster processing' }, { value: '99.9%', label: 'uptime post-launch' }, { value: '3×', label: 'team capacity unlocked' }],
    tags:     ['Platform Engineering', 'API Design', 'Cloud Migration'],
  },
  {
    client:   'PulseCommerce',
    industry: 'Retail & E-Commerce',
    service:  'Growth & Intelligence',
    headline: 'Built a full analytics stack — 3.2× revenue growth in 18 months.',
    summary:  'PulseCommerce had data scattered across 11 tools. We built a unified data warehouse, BI dashboards, and a performance marketing intelligence layer that transformed how leadership made decisions.',
    metrics:  [{ value: '3.2×', label: 'revenue growth' }, { value: '280%', label: 'organic traffic increase' }, { value: '18 mo', label: 'to results' }],
    tags:     ['Data Architecture', 'BI Dashboards', 'SEO Strategy'],
  },
  {
    client:   'Meridian Health Network',
    industry: 'Healthcare',
    service:  'Business Foundation',
    headline: 'Automated 80% of manual workflows — saving 1,200 staff hours per month.',
    summary:  'Meridian\'s operations team was drowning in manual data entry, reporting, and cross-system reconciliation. We mapped, redesigned, and automated their core administrative workflows end-to-end.',
    metrics:  [{ value: '1,200', label: 'hrs/mo saved' }, { value: '80%', label: 'workflows automated' }, { value: '40%', label: 'error rate reduction' }],
    tags:     ['Process Automation', 'Systems Integration', 'Operational Dashboards'],
  },
  {
    client:   'Ashford Logistics',
    industry: 'Logistics & Supply Chain',
    service:  'Software Engineering',
    headline: 'Built a real-time shipment tracking platform — 10,000+ daily active users.',
    summary:  'Ashford needed a customer-facing tracking platform that could handle real-time data from 40+ carrier integrations. We delivered a scalable, sub-100ms response system with a clean consumer UX.',
    metrics:  [{ value: '10k+', label: 'daily active users' }, { value: '<100ms', label: 'API response time' }, { value: '40+', label: 'carrier integrations' }],
    tags:     ['Platform Development', 'Real-time APIs', 'Enterprise UX'],
  },
  {
    client:   'Summit Property Group',
    industry: 'Real Estate & PropTech',
    service:  'Business Foundation',
    headline: 'Created a centralized deal management system that replaced 4 separate tools.',
    summary:  'Summit was managing deals across spreadsheets, email threads, shared drives, and two legacy CRMs. We replaced the entire stack with a unified deal management platform built around how their team actually works.',
    metrics:  [{ value: '4→1', label: 'tools consolidated' }, { value: '65%', label: 'faster deal closing' }, { value: '100%', label: 'team adoption in 30 days' }],
    tags:     ['Systems Integration', 'Custom CRM', 'Workflow Design'],
  },
  {
    client:   'Crestview Manufacturing',
    industry: 'Manufacturing',
    service:  'Growth & Intelligence',
    headline: 'Designed a production intelligence dashboard — first profitable quarter in 3 years.',
    summary:  'Crestview had no visibility into production efficiency, waste, or throughput variation. We built a real-time production intelligence layer connected to their floor systems, revealing $1.2M in previously invisible inefficiencies.',
    metrics:  [{ value: '$1.2M', label: 'inefficiencies identified' }, { value: 'Q1', label: 'first profitable quarter' }, { value: '22%', label: 'waste reduction' }],
    tags:     ['Manufacturing Analytics', 'IoT Integration', 'BI Dashboards'],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Case Studies</SectionLabel>
            <SectionTitle className="mb-6">
              Real projects. Measurable outcomes.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              We let the results speak. Below is a selection of enterprise engagements — each showing the challenge, what we built, and what changed as a result.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper>
        <PageContainer>
          {/* Filter tabs (UI-ready, static for Phase 1) */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? 'bg-accent-600/15 text-accent-400 border border-accent-600/30'
                    : 'text-slate-500 border border-white/[0.07] hover:text-slate-300 hover:border-white/[0.14]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Case study cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CASE_STUDIES.map((cs) => (
              <article key={cs.client} className="card-surface rounded-2xl p-8 flex flex-col gap-6 group hover:border-accent-600/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      {cs.industry}
                    </p>
                    <h2 className="font-display font-700 text-xl text-slate-100">{cs.client}</h2>
                  </div>
                  <span className="label-chip flex-shrink-0 text-2xs">{cs.service}</span>
                </div>

                {/* Headline */}
                <p className="text-base font-semibold text-slate-200 leading-snug">{cs.headline}</p>

                {/* Summary */}
                <p className="text-sm text-slate-400 leading-relaxed">{cs.summary}</p>

                {/* Metrics */}
                <div className="flex gap-6 pt-4 border-t border-white/[0.06]">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-0.5">
                      <span className="font-display font-800 text-xl gradient-text">{m.value}</span>
                      <span className="text-xs text-slate-600">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg text-xs text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Want results like these?" subtitle="Let's talk about your business. We'll give you an honest perspective on what's possible and how to get there." primaryLabel="Start the Conversation" />
    </>
  )
}
