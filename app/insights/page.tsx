import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.insights.title,
  description: SITE_METADATA.pages.insights.description,
}

const CATEGORIES = ['All', 'Technology', 'Strategy', 'Operations', 'Industry', 'Leadership']

const ARTICLES = [
  {
    slug:        'why-enterprise-software-fails',
    category:    'Technology',
    title:       'Why Most Enterprise Software Projects Fail Before Launch',
    excerpt:     'The most common cause of software project failure isn\'t budget overruns or technical complexity. It\'s decisions made in the first two weeks.',
    author:      'James Harrington',
    authorRole:  'CEO',
    date:        '2025-11-15',
    readingTime: 8,
    featured:    true,
  },
  {
    slug:        'data-infrastructure-for-scaling-businesses',
    category:    'Strategy',
    title:       'The Data Infrastructure Every Scaling Business Needs',
    excerpt:     'At a certain growth inflection point, gut-feel decision-making stops working. Here\'s how to build the intelligence layer that replaces it.',
    author:      'Elena Park',
    authorRole:  'Head of Growth Intelligence',
    date:        '2025-10-28',
    readingTime: 6,
    featured:    false,
  },
  {
    slug:        'operational-automation-guide',
    category:    'Operations',
    title:       'A Practical Guide to Operational Automation for National Businesses',
    excerpt:     'Not every process should be automated. But the ones that should be, really should be. How to prioritize, plan, and execute automation at scale.',
    author:      'Mark Chen',
    authorRole:  'Head of Business Foundation',
    date:        '2025-10-10',
    readingTime: 10,
    featured:    false,
  },
  {
    slug:        'api-design-principles',
    category:    'Technology',
    title:       'API Design Principles for Systems That Last a Decade',
    excerpt:     'API design is one of the highest-leverage technical decisions a business makes. These are the principles we apply to every API we build.',
    author:      'Sarah Mitchell',
    authorRole:  'Principal Engineer',
    date:        '2025-09-22',
    readingTime: 7,
    featured:    false,
  },
  {
    slug:        'technology-strategy-for-non-technical-ceos',
    category:    'Leadership',
    title:       'Technology Strategy for Non-Technical CEOs',
    excerpt:     'You don\'t need to understand how software works. But you do need to understand how to make good decisions about it. Here\'s the framework we use.',
    author:      'James Harrington',
    authorRole:  'CEO',
    date:        '2025-09-05',
    readingTime: 9,
    featured:    false,
  },
  {
    slug:        'saas-market-enterprise-trends',
    category:    'Industry',
    title:       'Enterprise SaaS in 2026: What\'s Actually Changing',
    excerpt:     'Beyond the hype cycles, three structural shifts are genuinely changing how enterprise software is built, bought, and used.',
    author:      'Elena Park',
    authorRole:  'Head of Growth Intelligence',
    date:        '2025-08-18',
    readingTime: 11,
    featured:    false,
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function InsightsPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Insights</SectionLabel>
            <SectionTitle className="mb-6">
              Thinking on enterprise technology, strategy, and growth.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              Perspectives from our team on the decisions that shape enterprise technology — written for leaders who take their technology investments seriously.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper>
        <PageContainer>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? 'bg-accent-600/15 text-accent-400 border border-accent-600/30'
                    : 'text-slate-500 border border-white/[0.07] hover:text-slate-300 hover:border-white/[0.14]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <div className="mb-10">
            <Link href={`/insights/${featured.slug}`} className="group block card-surface rounded-2xl p-8 lg:p-10 hover:border-accent-600/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="label-chip">{featured.category}</span>
                    <span className="text-xs text-slate-600">{featured.readingTime} min read</span>
                  </div>
                  <h2 className="font-display font-700 text-2xl sm:text-3xl text-slate-100 mb-4 leading-snug tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-xs font-bold">
                      {featured.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-300">{featured.author}</p>
                      <p className="text-xs text-slate-600">{featured.authorRole} · {formatDate(featured.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-full aspect-[4/3] card-surface rounded-2xl flex items-center justify-center">
                    <div className="text-center flex flex-col gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center mx-auto">
                        <span className="font-display font-800 text-2xl text-accent-400">F</span>
                      </div>
                      <p className="text-sm text-slate-600">Featured Article</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group block card-surface rounded-2xl p-6 hover:border-accent-600/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="label-chip text-2xs">{article.category}</span>
                  <span className="text-xs text-slate-600">{article.readingTime} min</span>
                </div>
                <h3 className="font-display font-700 text-lg text-slate-200 mb-3 leading-snug group-hover:text-slate-100 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-2xs font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <p className="text-xs text-slate-500">{article.author}</p>
                  </div>
                  <span className="text-xs text-slate-600">{formatDate(article.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
