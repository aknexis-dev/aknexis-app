import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Clock, Users, Star } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.careers.title,
  description: SITE_METADATA.pages.careers.description,
}

const VALUES = [
  { icon: <Star className="w-5 h-5" />,   title: 'Excellence over volume',  desc: 'We do fewer things, better. Every engineer, strategist, and designer works on meaningful problems with real consequences.' },
  { icon: <Users className="w-5 h-5" />,  title: 'Deep collaboration',      desc: 'No silos, no heroics. We work together across disciplines because the best solutions come from diverse thinking.' },
  { icon: <Clock className="w-5 h-5" />,  title: 'Long-term thinking',      desc: 'We invest in our people the same way we invest in our clients — for the long term, not just for the current sprint.' },
  { icon: <MapPin className="w-5 h-5" />, title: 'Flexible by design',      desc: 'Remote-first with optional in-person collaboration. We care about output and impact, not office hours.' },
]

const OPEN_ROLES = [
  {
    title:       'Senior Full-Stack Engineer',
    department:  'Engineering',
    type:        'Full-time',
    location:    'Remote (US)',
    description: 'Join our core engineering team building enterprise software platforms for national businesses. You\'ll architect, build, and deliver production systems that matter.',
    requirements: ['5+ years production full-stack experience', 'Deep knowledge of TypeScript, Node.js, React', 'Experience with cloud infrastructure (AWS/GCP)', 'Strong opinions on system architecture'],
  },
  {
    title:       'Technical Solutions Architect',
    department:  'Consulting',
    type:        'Full-time',
    location:    'New York / Remote',
    description: 'Work directly with clients in the discovery phase to define technical architecture and solution design. Bridge business requirements and technical execution.',
    requirements: ['8+ years in enterprise software or consulting', 'Strong communication with non-technical stakeholders', 'Experience with large-scale system design', 'Ability to lead technical scoping sessions'],
  },
  {
    title:       'Data Engineer & BI Analyst',
    department:  'Growth Intelligence',
    type:        'Full-time',
    location:    'Remote (US)',
    description: 'Build data pipelines, warehouses, and dashboards that give our clients real insight into their business. Own the data infrastructure layer from ingestion to visualization.',
    requirements: ['4+ years in data engineering or analytics', 'Strong SQL, dbt, and warehouse tooling (Snowflake, BigQuery)', 'Experience with BI platforms (Metabase, Looker, Tableau)', 'Understanding of business analytics and KPI frameworks'],
  },
  {
    title:       'Operations & Automation Consultant',
    department:  'Business Foundation',
    type:        'Full-time',
    location:    'Remote / Austin',
    description: 'Map client business processes, design automation strategies, and implement workflow systems. Help clients run operations that scale without adding headcount.',
    requirements: ['3+ years in business process consulting or ops roles', 'Experience with automation tools (Zapier, n8n, RPA)', 'Systems integration knowledge', 'Strong process documentation skills'],
  },
  {
    title:       'Engineering Internship — Summer 2026',
    department:  'Engineering',
    type:        'Internship',
    location:    'Remote or San Francisco',
    description: 'A paid, meaningful internship program for students who want to work on real enterprise projects. Not a task-runner role — you\'ll contribute to production systems.',
    requirements: ['CS or related degree (junior or senior year)', 'Working knowledge of TypeScript or Python', 'Strong communication and curiosity', 'Genuine interest in enterprise software'],
  },
]

export default function CareersPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Careers</SectionLabel>
            <SectionTitle className="mb-6">
              Build technology that actually matters.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              At AKnexis, you won&rsquo;t be building feature #47 of a consumer app. You&rsquo;ll be engineering the systems that run national businesses — and you&rsquo;ll see the impact of your work directly.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="mb-4">Culture</SectionLabel>
            <SectionTitle className="mb-4">How we work.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="card-surface rounded-2xl p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400">
                  {v.icon}
                </div>
                <h3 className="font-display font-700 text-base text-slate-200">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Open roles */}
      <SectionWrapper>
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="mb-4">Open Roles</SectionLabel>
            <SectionTitle className="mb-4">Join the team.</SectionTitle>
          </div>
          <div className="flex flex-col gap-4">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="card-surface rounded-2xl p-7 group hover:border-accent-600/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display font-700 text-xl text-slate-100 mb-1">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span>{role.department}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>{role.type}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {role.location}</span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/25 hover:border-accent-600/40 text-accent-400 text-sm font-semibold rounded-xl transition-all duration-200 group/btn"
                  >
                    Apply
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.requirements.map((r) => (
                    <span key={r} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg text-xs text-slate-500">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Open app */}
      <SectionWrapper background="surface">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionTitle className="mb-4 text-2xl sm:text-3xl">Don&rsquo;t see a perfect fit?</SectionTitle>
            <BodyText className="mb-7 max-w-xl mx-auto">
              We occasionally hire exceptional people into roles we haven&rsquo;t listed yet. If you&rsquo;re genuinely excellent and believe in what we&rsquo;re building, we want to hear from you.
            </BodyText>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] text-slate-200 border border-white/[0.10] hover:border-white/[0.18] font-semibold rounded-xl transition-all duration-200">
              Send an open application
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Ready to build things that matter?" subtitle="Apply for an open role or reach out directly. We'd love to hear from exceptional people." primaryLabel="View Open Roles" secondaryLabel="Learn About Aknexis" secondaryHref="/about" />
    </>
  )
}
