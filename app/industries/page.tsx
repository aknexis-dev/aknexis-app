import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Landmark, HeartPulse, ShoppingBag, Factory, Truck, Briefcase, Building, Cpu } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.industries.title,
  description: SITE_METADATA.pages.industries.description,
}

const INDUSTRIES = [
  {
    icon:     <Landmark className="w-6 h-6" />,
    name:     'Financial Services',
    desc:     'Trading platforms, portfolio management systems, regulatory compliance automation, and client data infrastructure for investment groups, family offices, and financial institutions.',
    useCases: ['Portfolio management systems', 'Regulatory compliance automation', 'Client reporting platforms', 'Financial data pipelines'],
  },
  {
    icon:     <HeartPulse className="w-6 h-6" />,
    name:     'Healthcare & Life Sciences',
    desc:     'Patient management platforms, clinical workflow systems, and healthcare data infrastructure — built with HIPAA-aligned security and the reliability that healthcare demands.',
    useCases: ['Patient management systems', 'Clinical workflow automation', 'Healthcare analytics dashboards', 'Compliance infrastructure'],
  },
  {
    icon:     <ShoppingBag className="w-6 h-6" />,
    name:     'Retail & E-Commerce',
    desc:     'Commerce platforms, inventory intelligence, and customer data systems that help retail businesses compete online and deliver the personalized experiences that modern customers expect.',
    useCases: ['Commerce platform development', 'Inventory & demand intelligence', 'Customer analytics', 'Omnichannel integration'],
  },
  {
    icon:     <Factory className="w-6 h-6" />,
    name:     'Manufacturing',
    desc:     'Production intelligence, supply chain visibility, and operational automation for manufacturers who need real-time insight into their operations and the data to optimize them.',
    useCases: ['Production intelligence dashboards', 'Supply chain visibility', 'Quality management systems', 'IoT data integration'],
  },
  {
    icon:     <Truck className="w-6 h-6" />,
    name:     'Logistics & Supply Chain',
    desc:     'Fleet management systems, shipment tracking platforms, and logistics intelligence infrastructure for carriers, freight brokers, and supply chain operators.',
    useCases: ['Shipment tracking platforms', 'Fleet management systems', 'Carrier integration APIs', 'Route optimization intelligence'],
  },
  {
    icon:     <Briefcase className="w-6 h-6" />,
    name:     'Professional Services',
    desc:     'Practice management platforms, client portal systems, and business intelligence for law firms, consulting firms, accounting practices, and other knowledge-intensive businesses.',
    useCases: ['Practice management systems', 'Client portal development', 'Billing & matter intelligence', 'Document automation'],
  },
  {
    icon:     <Building className="w-6 h-6" />,
    name:     'Real Estate & PropTech',
    desc:     'Deal management platforms, property data systems, and investment analytics for developers, investors, brokers, and property management groups.',
    useCases: ['Deal management platforms', 'Property data intelligence', 'Investor reporting systems', 'Leasing & tenant portals'],
  },
  {
    icon:     <Cpu className="w-6 h-6" />,
    name:     'SaaS & Technology',
    desc:     'Product engineering, growth infrastructure, and operational foundations for software companies — from early-stage platforms to scaling enterprise SaaS products.',
    useCases: ['SaaS product engineering', 'Growth analytics systems', 'DevOps & cloud infrastructure', 'Technical debt remediation'],
  },
]

export default function IndustriesPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Industries</SectionLabel>
            <SectionTitle className="mb-6">
              Deep experience across every major sector.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              We have built enterprise technology for businesses across eight industries. Each sector has its own operating model, compliance requirements, and technical demands — and we understand them.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper>
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="card-surface rounded-2xl p-7 group hover:border-accent-600/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 flex-shrink-0 group-hover:bg-accent-600/15 transition-all duration-300">
                    {ind.icon}
                  </div>
                  <h2 className="font-display font-700 text-xl text-slate-100 leading-snug mt-1.5">{ind.name}</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{ind.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {ind.useCases.map((uc) => (
                    <span key={uc} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg text-xs text-slate-500">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper background="surface">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionTitle className="mb-5">Don&rsquo;t see your industry?</SectionTitle>
            <BodyText className="mb-8 max-w-xl mx-auto">
              Our approach translates across sectors. If you&rsquo;re building serious technology for a serious business, the conversation is worth having regardless of which industry you&rsquo;re in.
            </BodyText>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] group">
              Tell us about your business
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Built for your industry. Designed for your business." subtitle="Let's discuss the specific technology challenges and opportunities in your sector." primaryLabel="Start the Conversation" />
    </>
  )
}
