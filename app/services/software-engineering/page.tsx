import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Code2, Layers, Zap, Shield, RefreshCw, Cloud } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { Card } from '@/components/ui/cards/Card'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.softwareEngineering.title,
  description: SITE_METADATA.pages.softwareEngineering.description,
}

const CAPABILITIES = [
  { icon: <Code2 className="w-5 h-5" />,      title: 'Custom Platform Development',   desc: 'End-to-end web and mobile applications built for enterprise scale — from architecture to production deployment.' },
  { icon: <Layers className="w-5 h-5" />,      title: 'API Design & Integration',       desc: 'RESTful and GraphQL APIs, third-party integrations, and microservice architectures designed for long-term maintainability.' },
  { icon: <Zap className="w-5 h-5" />,         title: 'Performance Engineering',        desc: 'Systematic optimization of load times, query performance, and scalability under real production conditions.' },
  { icon: <RefreshCw className="w-5 h-5" />,   title: 'Legacy Modernization',           desc: 'Strategic migration from outdated systems to modern, maintainable architectures — without business disruption.' },
  { icon: <Cloud className="w-5 h-5" />,       title: 'Cloud & DevOps',                 desc: 'Infrastructure-as-code, CI/CD pipelines, containerization, and cloud cost optimization on AWS, GCP, or Azure.' },
  { icon: <Shield className="w-5 h-5" />,      title: 'Security by Design',             desc: 'Security architecture baked into every layer — not bolted on after launch. Encryption, RBAC, and compliance-ready design.' },
]

const OUTCOMES = [
  'Systems that scale from 10 to 10,000 users without architectural rework',
  'Clean, documented codebases that your team can maintain and extend',
  'Delivery timelines you can plan around — with milestone accountability',
  'Architecture reviews before major decisions, not after',
  'Technology choices aligned to your 5-year roadmap, not just today',
  'Owned source code and zero vendor lock-in',
]

const WORKFLOW = [
  { step: '01', title: 'Technical Discovery',  desc: 'Audit your existing systems, understand integration requirements, and define technical constraints and ambitions.' },
  { step: '02', title: 'Architecture Design',  desc: 'Create a detailed technical blueprint — stack choices, data models, API contracts, and scalability plan — before development begins.' },
  { step: '03', title: 'Structured Development', desc: 'Iterative, milestone-driven development with weekly demonstrations and early staging access throughout the build.' },
  { step: '04', title: 'Launch & Stabilization', desc: 'Production deployment with monitoring, performance baseline, and a 30-day stabilization period before full handover.' },
]

export default function SoftwareEngineeringPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-accent-600/10 border border-accent-600/20 rounded-full">
              <Code2 className="w-4 h-4 text-accent-400" />
              <span className="text-xs font-semibold text-accent-400 tracking-wider uppercase">Software Engineering</span>
            </div>
            <SectionTitle className="mb-6">
              Engineering platforms built to outlast your competition.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto mb-8">
              We design and build enterprise-grade software that doesn&rsquo;t just work at launch — it performs, scales, and remains maintainable for years. Because in business, technical debt is just slow-motion failure.
            </BodyText>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.4)] group"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Problem context */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-5">The Problem</SectionLabel>
              <SectionTitle className="mb-5">
                Most software fails its users long before it fails technically.
              </SectionTitle>
              <BodyText className="mb-5">
                The issue isn&rsquo;t usually that the software stops working — it&rsquo;s that it was never designed to grow. Architectures that cannot scale. Codebases that nobody can maintain. Systems that were built for launch, not for operation.
              </BodyText>
              <BodyText>
                We&rsquo;ve seen it across every industry. And we built our entire engineering practice around avoiding it.
              </BodyText>
            </div>
            <div className="card-surface rounded-2xl p-8 flex flex-col gap-5">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Common failure points we solve</p>
              {[
                'Architecture designed for launch, not scale',
                'Missing documentation and knowledge silos',
                'No separation between business logic and infrastructure',
                'Security as an afterthought',
                'Third-party dependencies without exit strategies',
                'Testing gaps that compound over time',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 flex-shrink-0 mt-2" />
                  <span className="text-sm text-slate-400">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Capabilities */}
      <SectionWrapper>
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="mb-4">Capabilities</SectionLabel>
            <SectionTitle className="mb-4">What we build.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.title} hover padding="lg" className="group">
                <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 mb-5 group-hover:bg-accent-600/15 transition-all duration-300">
                  {cap.icon}
                </div>
                <h3 className="font-display font-700 text-base text-slate-200 mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Workflow */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel className="mb-4">Our Engineering Process</SectionLabel>
            <SectionTitle className="mb-4">How we deliver.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW.map((w) => (
              <div key={w.step} className="card-surface rounded-2xl p-6 flex flex-col gap-4">
                <span className="font-display font-800 text-3xl gradient-text">{w.step}</span>
                <h3 className="font-display font-700 text-base text-slate-200">{w.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Outcomes */}
      <SectionWrapper>
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel className="mb-5">What You Get</SectionLabel>
              <SectionTitle className="mb-5">
                The outcomes that matter for your business.
              </SectionTitle>
              <BodyText>
                Our definition of a successful project isn&rsquo;t &ldquo;it launched on time.&rdquo; It&rsquo;s that your business is meaningfully better because of what we built together — and will remain so for years.
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

      <CTABanner title="Let's build something built to last." subtitle="Tell us about your project — we'll give you an honest assessment of what it takes to do it right." primaryLabel="Discuss Your Project" />
    </>
  )
}
