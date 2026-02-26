import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { CTABanner } from '@/components/sections/CTABanner'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { TestimonialCard } from '@/components/ui/cards/Card'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.home.title,
  description: SITE_METADATA.pages.home.description,
}

const INDUSTRIES = [
  'Financial Services', 'Healthcare & Life Sciences', 'Retail & E-Commerce',
  'Manufacturing', 'Logistics & Supply Chain', 'Professional Services',
  'Real Estate & PropTech', 'SaaS & Technology',
]

const CASE_PREVIEWS = [
  {
    client:   'Regional Investment Group',
    industry: 'Financial Services',
    result:   'Rebuilt core operations platform — reduced processing time by 74%',
    metric:   '74%',
    metricLabel: 'faster',
    tag:      'Software Engineering',
  },
  {
    client:   'National Retail Chain',
    industry: 'Retail & E-Commerce',
    result:   'Full-stack analytics system — 3.2× revenue growth in 18 months',
    metric:   '3.2×',
    metricLabel: 'growth',
    tag:      'Growth & Intelligence',
  },
  {
    client:   'Healthcare Network',
    industry: 'Healthcare',
    result:   'Automated 80% of manual workflows — saved 1,200 staff hours/month',
    metric:   '1,200',
    metricLabel: 'hrs/mo saved',
    tag:      'Business Foundation',
  },
]

const TESTIMONIALS = [
  {
    quote:   'Aknexis didn\'t just build software — they redesigned how we operate. The results were measurable within 60 days of launch.',
    author:  'Michael Torres',
    role:    'CEO',
    company: 'InvestCorp Group',
  },
  {
    quote:   'The team has a rare combination: technical depth and genuine business understanding. They ask the right questions before writing a single line of code.',
    author:  'Sarah Kim',
    role:    'COO',
    company: 'Meridian Health',
  },
  {
    quote:   'We brought in Aknexis to help us scale. Two years later, they\'re still our first call whenever we\'re planning something significant.',
    author:  'David Okafor',
    role:    'CTO',
    company: 'PulseCommerce',
  },
]

const PLATFORM_CAPABILITIES = [
  'Custom enterprise applications',
  'SaaS product development',
  'API design & system integration',
  'Data warehouses & BI dashboards',
  'Workflow automation & RPA',
  'Cloud infrastructure & DevOps',
  'Cybersecurity architecture',
  'Mobile & cross-platform apps',
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <ServicesPreview />

      {/* Platform capabilities */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-5">Platform Capabilities</SectionLabel>
              <SectionTitle className="mb-5">
                One partner. Full technical capability.
              </SectionTitle>
              <BodyText className="mb-8">
                From initial architecture to post-launch optimization, we operate across the complete technology stack. No need to manage multiple vendors or bridge communication gaps.
              </BodyText>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors duration-200 group"
              >
                View full capability list
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLATFORM_CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-center gap-3 px-4 py-3 card-surface rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Industries */}
      <SectionWrapper>
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel className="mb-4">Industries Served</SectionLabel>
            <SectionTitle className="mb-4">
              Experience across every major sector.
            </SectionTitle>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center mb-8">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 glass border border-white/[0.08] rounded-full text-sm text-slate-400 hover:text-slate-200 hover:border-white/[0.15] transition-all duration-200"
              >
                {ind}
              </span>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors duration-200"
            >
              View all industries
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Case studies preview */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel className="mb-4">Case Studies</SectionLabel>
              <SectionTitle>Proof in the numbers.</SectionTitle>
            </div>
            <Link
              href="/case-studies"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors duration-200 flex-shrink-0 group"
            >
              View all cases
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {CASE_PREVIEWS.map((c) => (
              <Link
                key={c.client}
                href="/case-studies"
                className="group card-surface rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-600/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      {c.industry}
                    </p>
                    <h3 className="font-display font-700 text-base text-slate-200">{c.client}</h3>
                  </div>
                  <span className="label-chip flex-shrink-0 text-2xs">{c.tag}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{c.result}</p>
                <div className="flex items-baseline gap-1.5 pt-4 border-t border-white/[0.06]">
                  <span className="font-display font-800 text-2xl gradient-text">{c.metric}</span>
                  <span className="text-sm text-slate-500">{c.metricLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="mb-4">Client Testimonials</SectionLabel>
            <SectionTitle>Trusted by leaders who demand more.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Security section */}
      <SectionWrapper background="surface">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-5">Security & Reliability</SectionLabel>
            <SectionTitle className="mb-5">
              Built with security as the foundation, not an afterthought.
            </SectionTitle>
            <BodyText className="mb-8 max-w-2xl mx-auto">
              Every system we build follows security-first architecture. From encrypted data pipelines to role-based access control and compliance-aware design — enterprise security is non-negotiable at Aknexis.
            </BodyText>
            <div className="flex flex-wrap gap-3 justify-center">
              {['End-to-end encryption', 'SOC 2-aligned', 'RBAC architecture', 'Secure SDLC', 'Penetration-tested', 'Audit logging'].map((s) => (
                <span key={s} className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/8 border border-teal-500/20 rounded-full text-xs font-medium text-teal-400">
                  <CheckCircle2 className="w-3 h-3" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner />
    </>
  )
}
