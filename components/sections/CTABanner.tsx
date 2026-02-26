import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'

interface CTABannerProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTABanner({
  title       = 'Ready to build something that lasts?',
  subtitle    = 'Let\'s discuss your goals, your current challenges, and what a long-term technology partnership could look like for your business.',
  primaryLabel  = 'Book a Free Consultation',
  primaryHref   = '/contact',
  secondaryLabel = 'View Case Studies',
  secondaryHref  = '/case-studies',
}: CTABannerProps) {
  return (
    <SectionWrapper>
      <PageContainer>
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-cta-gradient" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent-500/10 rounded-full blur-[80px]" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-5 text-balance">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-accent-700 font-semibold text-base rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.3)] group"
              >
                {primaryLabel}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
              {secondaryLabel && (
                <Link
                  href={secondaryHref ?? '/case-studies'}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
