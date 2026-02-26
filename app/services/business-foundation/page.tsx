import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Building2, Workflow, Link2, FileText, LayoutDashboard, Settings } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { Card } from '@/components/ui/cards/Card'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.businessFoundation.title,
  description: SITE_METADATA.pages.businessFoundation.description,
}

const CAPABILITIES = [
  { icon: <Workflow className="w-5 h-5" />,         title: 'Workflow Automation',         desc: 'Map, redesign, and automate the manual processes that consume your team\'s time and create operational risk.' },
  { icon: <Link2 className="w-5 h-5" />,            title: 'Systems Integration',         desc: 'Connect your disparate tools and platforms into a unified operational ecosystem with clean data flows.' },
  { icon: <FileText className="w-5 h-5" />,         title: 'Document & Contract Management', desc: 'Digital infrastructure for contracts, compliance documents, and internal knowledge — organized, secure, accessible.' },
  { icon: <LayoutDashboard className="w-5 h-5" />,  title: 'Operational Dashboards',      desc: 'Real-time visibility into your operations — projects, team performance, financials, and KPIs in one place.' },
  { icon: <Settings className="w-5 h-5" />,         title: 'Process Engineering',          desc: 'Systematic review and redesign of core business processes to eliminate friction, reduce cost, and improve quality.' },
  { icon: <Building2 className="w-5 h-5" />,        title: 'Business Systems Consulting',  desc: 'Strategic advice on tool selection, system architecture, and operational structure for scaling businesses.' },
]

const OUTCOMES = [
  'Eliminate repetitive manual tasks that consume high-value staff time',
  'Real-time operational visibility without waiting for weekly reports',
  'Connected systems that share data automatically — no more copy-paste',
  'Documented, repeatable processes that don\'t depend on one person\'s knowledge',
  'Reduced operational errors and compliance risk from manual handling',
  'Infrastructure that can absorb 3× business growth without a hiring surge',
]

export default function BusinessFoundationPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-white/[0.06] border border-white/[0.10] rounded-full">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Business Foundation</span>
            </div>
            <SectionTitle className="mb-6">
              Build the operations your growth demands.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto mb-8">
              The fastest-growing businesses aren&rsquo;t always the ones with the best product. They&rsquo;re the ones whose operations can absorb growth without breaking. We build that foundation.
            </BodyText>
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.4)] group">
              Start an Operations Audit
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-5">The Challenge</SectionLabel>
              <SectionTitle className="mb-5">Operational drag silently kills growth.</SectionTitle>
              <BodyText className="mb-4">
                Most operational problems don&rsquo;t announce themselves. They accumulate quietly — in hours spent on manual tasks, in data that lives in spreadsheets, in processes that only three people understand, in systems that don&rsquo;t talk to each other.
              </BodyText>
              <BodyText>
                By the time leadership notices, the business has already paid an enormous, invisible cost. We help you find and eliminate that drag before it becomes a ceiling on your growth.
              </BodyText>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'avg hours/week lost to manual reporting', value: '12+' },
                { label: 'operational processes with no documentation', value: '60%' },
                { label: 'tools used by average SME with no integration', value: '7–14' },
                { label: 'operational cost reduction from good automation', value: '30–50%' },
              ].map((s) => (
                <div key={s.label} className="card-surface rounded-2xl p-5">
                  <div className="font-display font-800 text-3xl gradient-text mb-2">{s.value}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.label}</p>
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
            <SectionTitle>What we build for you.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.title} hover padding="lg" className="group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-slate-400 mb-5 group-hover:bg-white/[0.09] transition-all duration-300">
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
              <SectionLabel className="mb-5">Business Outcomes</SectionLabel>
              <SectionTitle className="mb-5">What improves when your foundation is solid.</SectionTitle>
              <BodyText>
                Operational transformation isn&rsquo;t glamorous. But the businesses that invest in it early are the ones that scale without chaos. Here&rsquo;s what becomes possible.
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

      <CTABanner title="Ready to run smarter operations?" subtitle="We'll start with a free operations audit — a structured review of your current systems, processes, and automation opportunities." primaryLabel="Book an Operations Audit" />
    </>
  )
}
