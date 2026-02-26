import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, TrendingUp, BarChart3, Search, Target, Database, Lightbulb } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { Card } from '@/components/ui/cards/Card'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.growthIntelligence.title,
  description: SITE_METADATA.pages.growthIntelligence.description,
}

const CAPABILITIES = [
  { icon: <Database className="w-5 h-5" />,    title: 'Data Architecture',        desc: 'Data warehouse design, ETL pipelines, and clean data infrastructure that makes analysis actually reliable.' },
  { icon: <BarChart3 className="w-5 h-5" />,   title: 'Business Intelligence',    desc: 'Executive and operational dashboards that surface the metrics that matter — and make them actionable.' },
  { icon: <Search className="w-5 h-5" />,      title: 'SEO & Organic Growth',     desc: 'Technical SEO, content strategy, and search architecture for sustainable, compounding organic traffic growth.' },
  { icon: <Target className="w-5 h-5" />,      title: 'Conversion Optimization',  desc: 'Systematic funnel analysis and testing to turn more of your existing traffic into real business outcomes.' },
  { icon: <TrendingUp className="w-5 h-5" />,  title: 'Growth Strategy',          desc: 'Data-backed digital growth strategy aligned to your business model, market, and competitive positioning.' },
  { icon: <Lightbulb className="w-5 h-5" />,   title: 'Predictive Intelligence',  desc: 'Forecasting models and trend analysis that give your leadership team a clearer view of what comes next.' },
]

const OUTCOMES = [
  'A single source of truth for your business data',
  'Executive dashboards that take minutes, not days, to produce',
  'Organic traffic that grows month over month without ad spend',
  'Clear visibility into which channels and efforts actually drive revenue',
  'Decisions backed by data rather than instinct or opinion',
  'A data culture that compounds in value over time',
]

export default function GrowthIntelligencePage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-teal-500/10 border border-teal-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">Growth & Intelligence</span>
            </div>
            <SectionTitle className="mb-6">
              Turn your data into the clearest view in your market.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto mb-8">
              Most businesses sit on enormous amounts of data and can&rsquo;t see what&rsquo;s in it. We build the infrastructure and intelligence layer that changes that — permanently.
            </BodyText>
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.4)] group">
              Start Growing Smarter
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-5">The Problem</SectionLabel>
              <SectionTitle className="mb-5">Data without intelligence is just noise.</SectionTitle>
              <BodyText className="mb-5">
                Organizations collect more data than ever. Most of it sits in disconnected systems, spreadsheets that don&rsquo;t reconcile, and reports that nobody trusts. When leadership can&rsquo;t get a clear picture, decisions default to experience and intuition — and the business loses its edge.
              </BodyText>
              <BodyText>
                We eliminate that problem by building the data infrastructure, analytics systems, and growth programs that make intelligence available to the people who need it — when they need it.
              </BodyText>
            </div>
            <div className="flex flex-col gap-3">
              {[
                'Data sitting in 12 different tools that don\'t talk',
                'Reports that take days to produce manually',
                'Marketing spend with no clear attribution model',
                'SEO as an afterthought rather than a channel',
                'Decisions based on the loudest voice, not clearest data',
                'Growth metrics that nobody agrees on',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 px-4 py-3 card-surface rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 flex-shrink-0 mt-2" />
                  <span className="text-sm text-slate-400">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper>
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="mb-4">Capabilities</SectionLabel>
            <SectionTitle className="mb-4">What we deliver.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.title} hover padding="lg" className="group">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-500/15 transition-all duration-300">
                  {cap.icon}
                </div>
                <h3 className="font-display font-700 text-base text-slate-200 mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel className="mb-5">Outcomes</SectionLabel>
              <SectionTitle className="mb-5">What changes for your business.</SectionTitle>
              <BodyText>
                Growth and intelligence work compounds. The data infrastructure we build today becomes more valuable every quarter — as your data grows, as your team learns to use it, and as the insights sharpen.
              </BodyText>
            </div>
            <div className="flex flex-col gap-3">
              {OUTCOMES.map((o) => (
                <div key={o} className="flex items-start gap-3 px-5 py-4 card-surface rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-relaxed">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Ready to see your business more clearly?" subtitle="Start with a data audit — we'll show you exactly what's possible with what you already have." primaryLabel="Book a Data Consultation" />
    </>
  )
}
