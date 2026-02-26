import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Target, Eye, CheckCircle2, Globe } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { Card } from '@/components/ui/cards/Card'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.about.title,
  description: SITE_METADATA.pages.about.description,
}

const DIFFERENTIATORS = [
  {
    label: 'Architecture-first',
    desc:  'We design before we build. Every project starts with a deep technical and business architecture review to ensure the right decisions are made from day one.',
  },
  {
    label: 'Senior-only execution',
    desc:  'No junior handoffs. Every delivery is led and executed by senior engineers and strategists with real enterprise experience.',
  },
  {
    label: 'Long-term aligned',
    desc:  'We structure our engagements for long-term success. Our incentive is not quick launches — it\'s systems that serve you for years.',
  },
  {
    label: 'Business-native thinking',
    desc:  'We understand business operations as deeply as we understand code. Our recommendations always start with business outcomes.',
  },
]

const PRESENCE = [
  { city: 'New York', role: 'Headquarters & Strategy' },
  { city: 'San Francisco', role: 'Engineering & Product' },
  { city: 'Austin', role: 'Operations & Growth' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">About AKnexis</SectionLabel>
            <SectionTitle className="mb-6 text-balance">
              We build the systems that power{' '}
              <span className="gradient-text">national businesses.</span>
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              AKnexis was founded on a simple conviction: most businesses deserve better technology than they get. Not just better tools — better thinking, better architecture, and a partner who genuinely understands what it means to operate at scale.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Opening statement */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <blockquote className="text-2xl sm:text-3xl font-display font-600 text-slate-200 leading-snug tracking-tight mb-6">
                &ldquo;The technology infrastructure of your business is not an IT decision. It&rsquo;s a strategic one.&rdquo;
              </blockquote>
              <p className="text-slate-500 text-sm font-medium">— AKnexis Founding Team</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-slate-400 text-base leading-relaxed">
                Too many enterprise technology projects fail — not from lack of technical skill, but from lack of alignment between business goals and technical decisions. We built AKnexis to close that gap.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Our team brings together senior engineers, business strategists, and operational experts who have worked inside the industries we serve. We know what it takes to build technology that survives contact with real business operations.
              </p>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Vision and Mission */}
      <SectionWrapper>
        <PageContainer>
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Vision & Mission</SectionLabel>
            <SectionTitle>What we stand for.</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="lg" hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 mb-5 group-hover:bg-accent-600/15 transition-all duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display font-700 text-xl text-slate-100 mb-3">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                A world where ambitious businesses have access to enterprise-quality technology — regardless of size or geography. Where strong technical foundations create genuine competitive advantage, not just operational efficiency.
              </p>
            </Card>
            <Card padding="lg" hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-500/15 transition-all duration-300">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-700 text-xl text-slate-100 mb-3">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To design and build the technology systems that power serious business growth — with the care, precision, and long-term thinking that national-level operations demand. Every project. Every time.
              </p>
            </Card>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Differentiators */}
      <SectionWrapper background="surface">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel className="mb-5">Why AKnexis</SectionLabel>
              <SectionTitle className="mb-5">
                What makes us different from every other firm.
              </SectionTitle>
              <BodyText>
                We are not a consultancy that delegates to juniors. We are not an agency that prioritizes launch speed over architecture. We are a long-term technology partner built for businesses that take infrastructure seriously.
              </BodyText>
            </div>
            <div className="flex flex-col gap-4">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={d.label} className="flex gap-4 p-5 card-surface rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 flex-shrink-0 text-sm font-bold font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-display font-700 text-base text-slate-200 mb-1.5">{d.label}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* National presence */}
      <SectionWrapper>
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-5">National Presence</SectionLabel>
            <SectionTitle className="mb-5">
              Offices coast to coast.
            </SectionTitle>
            <BodyText className="mb-10">
              Our distributed team operates across three major markets, enabling us to serve clients nationwide with the responsiveness of a local partner and the depth of a national firm.
            </BodyText>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRESENCE.map((p) => (
                <div key={p.city} className="flex flex-col items-center gap-2 p-6 card-surface rounded-2xl">
                  <Globe className="w-6 h-6 text-accent-400 mb-1" />
                  <h3 className="font-display font-700 text-lg text-slate-200">{p.city}</h3>
                  <p className="text-sm text-slate-500">{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Leadership message */}
      <SectionWrapper background="surface">
        <PageContainer size="narrow">
          <div className="text-center mb-8">
            <SectionLabel className="mb-4">Leadership</SectionLabel>
          </div>
          <div className="card-surface rounded-3xl p-8 lg:p-12">
            <blockquote className="text-xl sm:text-2xl font-display font-600 text-slate-200 leading-snug tracking-tight mb-8 text-center text-balance">
              &ldquo;We started AKnexis because we kept watching good businesses fail from bad technology decisions. Not malicious decisions — just ones made without full understanding of the long-term implications. We exist to change that.&rdquo;
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-lg font-bold">
                J
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-200">James Harrington</p>
                <p className="text-sm text-slate-500">Co-Founder & CEO, AKnexis</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Commitment */}
      <SectionWrapper>
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionTitle className="mb-5">
              Our long-term commitment to you.
            </SectionTitle>
            <BodyText className="mb-8">
              We don&rsquo;t optimize for quick exits. Every client relationship is built for years, not quarters. When you partner with AKnexis, you gain a team that is invested in your success as deeply as you are.
            </BodyText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {['Guaranteed response within 4 hours', 'Dedicated account manager', 'Quarterly strategic reviews', 'Source code ownership always yours'].map((c) => (
                <div key={c} className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Work with a team that thinks like you do." subtitle="Let's start with a conversation about your goals. No pitch, no pressure — just a real discussion about what's possible." />
    </>
  )
}
