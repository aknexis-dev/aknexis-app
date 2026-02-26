import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.pricing.title,
  description: SITE_METADATA.pages.pricing.description,
}

const MODELS = [
  {
    id:          'project',
    name:        'Project Engagement',
    tagline:     'Ideal for defined-scope initiatives',
    description: 'A fixed-scope engagement with clearly defined deliverables, timelines, and investment. Best for platform builds, migrations, and contained initiatives.',
    features: [
      'Detailed technical scoping document',
      'Milestone-based delivery plan',
      'Weekly progress reports',
      'Senior-led execution throughout',
      'Full source code ownership',
      '30-day post-launch support included',
    ],
    idealFor:    'New platform builds, legacy migrations, defined product features',
    ctaLabel:    'Discuss a Project',
    highlighted: false,
  },
  {
    id:          'retainer',
    name:        'Strategic Retainer',
    tagline:     'Long-term partnership with dedicated capacity',
    description: 'A committed monthly engagement for businesses that need ongoing technical support, development capacity, and strategic input as they scale.',
    features: [
      'Dedicated monthly engineering hours',
      'Quarterly strategic technology review',
      'Priority response and SLA',
      'Continuous delivery and improvements',
      'Dedicated account manager',
      'Access to full service spectrum',
    ],
    idealFor:    'Scaling businesses, product companies, ongoing technical leadership needs',
    ctaLabel:    'Explore a Retainer',
    highlighted: true,
  },
  {
    id:          'advisory',
    name:        'Technical Advisory',
    tagline:     'Strategic guidance without full engagement',
    description: 'Access to senior-level technical expertise for businesses that need strategic input, architecture review, or leadership advisory without a full project engagement.',
    features: [
      'Regular advisory sessions (weekly or biweekly)',
      'Architecture and technical decision review',
      'Vendor and technology evaluation',
      'Team structure and hiring guidance',
      'On-call access for critical decisions',
      'Written recommendations and roadmaps',
    ],
    idealFor:    'CTO-as-a-service needs, pre-build validation, internal team support',
    ctaLabel:    'Inquire About Advisory',
    highlighted: false,
  },
]

const FAQS = [
  {
    q: 'Do you publish prices?',
    a: 'We don\'t publish fixed pricing because the right engagement structure depends on your specific goals, scale, and timeline. We always begin with a discovery call, and we will give you an honest, itemized proposal before any commitment.',
  },
  {
    q: 'What is the minimum engagement?',
    a: 'Project engagements typically start at a scope that warrants dedicated architecture and planning — usually $30,000+. Advisory engagements are available from a lower minimum. We don\'t do quick freelance tasks.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most platform builds run 3–6 months. Smaller, well-scoped features or integrations may be 4–8 weeks. Advisory engagements are ongoing. We will always give you a realistic timeline in the proposal.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Always. 100% of intellectual property, source code, and assets belong to you from the moment they\'re created.',
  },
  {
    q: 'Do you take on non-enterprise businesses?',
    a: 'We work with ambitious businesses at various stages, not exclusively large corporations. What matters is that you\'re serious about technology as a long-term investment — not looking for the cheapest option.',
  },
]

export default function PricingPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Engagement Models</SectionLabel>
            <SectionTitle className="mb-6">
              Transparent engagement. No surprises.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              We don&rsquo;t believe in hidden fees or vague scope. Every engagement starts with a discovery conversation, a detailed proposal, and a clear understanding of what you&rsquo;re investing in and why.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Engagement models */}
      <SectionWrapper>
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {MODELS.map((model) => (
              <div
                key={model.id}
                className={`rounded-2xl p-8 flex flex-col gap-6 relative ${
                  model.highlighted
                    ? 'bg-accent-600/10 border-2 border-accent-600/40 shadow-[0_0_40px_rgba(59,130,246,0.12)]'
                    : 'card-surface'
                }`}
              >
                {model.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-accent-600 text-white text-xs font-bold rounded-full shadow-[0_0_16px_rgba(59,130,246,0.5)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h2 className="font-display font-700 text-xl text-slate-100 mb-1">{model.name}</h2>
                  <p className={`text-sm font-medium ${model.highlighted ? 'text-accent-400' : 'text-slate-500'}`}>
                    {model.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{model.description}</p>

                <div className="divider" />

                <ul className="flex flex-col gap-3">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${model.highlighted ? 'text-accent-400' : 'text-teal-400'}`} />
                      <span className="text-sm text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-xs text-slate-600 mb-4">
                    <span className="font-semibold text-slate-500">Ideal for:</span> {model.idealFor}
                  </p>
                  <Link
                    href="/contact"
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                      model.highlighted
                        ? 'bg-accent-600 hover:bg-accent-700 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]'
                        : 'bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 border border-white/[0.09] hover:border-white/[0.16]'
                    }`}
                  >
                    {model.ctaLabel}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Custom proposal */}
      <SectionWrapper background="surface">
        <PageContainer size="narrow">
          <div className="text-center card-surface rounded-2xl p-10">
            <div className="w-14 h-14 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 mx-auto mb-5">
              <MessageSquare className="w-7 h-7" />
            </div>
            <SectionTitle className="mb-4 text-2xl sm:text-3xl">Need a custom engagement?</SectionTitle>
            <BodyText className="mb-7 max-w-xl mx-auto">
              Multi-year enterprise contracts, multi-team engagements, and complex multi-service programs are available with customized structures. Let&rsquo;s build the right model for your organization.
            </BodyText>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] group">
              Request a Custom Proposal
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* FAQs */}
      <SectionWrapper>
        <PageContainer size="narrow">
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Common Questions</SectionLabel>
            <SectionTitle>Frequently asked.</SectionTitle>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="card-surface rounded-2xl p-6">
                <h3 className="font-display font-600 text-base text-slate-200 mb-3">{faq.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Start with a real conversation." subtitle="No pressure, no pitch. Just an honest discussion about your goals and whether we're the right fit." primaryLabel="Book a Discovery Call" />
    </>
  )
}
