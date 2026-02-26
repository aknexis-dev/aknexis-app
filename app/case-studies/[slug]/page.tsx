import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { CTABanner } from '@/components/sections/CTABanner'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title:       `Case Study — ${params.slug.replace(/-/g, ' ')} | Aknexis`,
    description: 'Read how Aknexis delivered measurable enterprise results for this client.',
  }
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  // Phase 2: fetch from MongoDB by slug
  const slug = params.slug

  return (
    <>
      <SectionWrapper spacing="lg" className="pt-28">
        <PageContainer size="narrow">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>

          <div className="card-surface rounded-2xl p-8 lg:p-12">
            <span className="label-chip mb-5 inline-flex">Case Study</span>
            <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-50 leading-tight tracking-tight mb-4">
              Client Engagement: {slug.replace(/-/g, ' ')}
            </h1>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              This case study detail page is Phase-2 ready. Full case study content will be fetched from MongoDB by slug and rendered here. The architecture supports rich case study pages with challenge, solution, workflow, metrics, and testimonials.
            </p>

            <div className="flex flex-col gap-3">
              {['Challenge documented', 'Solution architecture defined', 'Outcome metrics tracked', 'Client testimonial included'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-slate-400">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/[0.07]">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/25 text-accent-400 text-sm font-semibold rounded-xl transition-all duration-200 group"
              >
                View all case studies
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      <CTABanner title="See what we can build for you." subtitle="Every engagement starts with a genuine conversation about your goals." primaryLabel="Book a Consultation" />
    </>
  )
}
