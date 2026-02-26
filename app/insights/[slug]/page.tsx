import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { CTABanner } from '@/components/sections/CTABanner'

interface PageProps {
  params: { slug: string }
}

// In Phase 2 this will fetch from MongoDB / CMS
const ARTICLE_STUBS: Record<string, {
  title: string; category: string; author: string; authorRole: string;
  date: string; readingTime: number; excerpt: string;
  content: string[]
}> = {
  'why-enterprise-software-fails': {
    title:       'Why Most Enterprise Software Projects Fail Before Launch',
    category:    'Technology',
    author:      'James Harrington',
    authorRole:  'CEO, Aknexis',
    date:        '2025-11-15',
    readingTime: 8,
    excerpt:     'The most common cause of software project failure isn\'t budget overruns or technical complexity. It\'s decisions made in the first two weeks.',
    content: [
      'In fifteen years of working on enterprise technology projects, I\'ve watched the same failure pattern emerge dozens of times. A business — often a well-run one with smart leadership — invests in a significant software project, and twelve months later they have something that doesn\'t work, costs twice what was budgeted, and nobody can maintain.',
      'The conventional explanation blames technical complexity, unrealistic timelines, or budget constraints. Those factors matter. But they\'re rarely the root cause. The root cause is almost always decisions made in the first two weeks.',
      'What happens in those first two weeks? The initial architecture decisions are made. The team structure is set. The scope is loosely defined. And the relationship between what the business actually needs and what the technical team is building gets established — or doesn\'t.',
      'The projects that succeed invest heavily in that initial period. They spend time understanding the business operations that the software will support. They document the workflows, the exceptions, the edge cases that only the people doing the work know about. They think carefully about what happens in three years, not just at launch.',
      'The projects that fail rush through it. They get into design and development quickly because that\'s where everyone feels most comfortable. The product looks good in demos six months in. And then it hits production, and real users with real workflows discover that it was never quite built for how the business actually runs.',
      'The fix is not complicated, but it requires discipline: treat architecture and discovery as the highest-stakes part of the project, not the preliminary work before the real work begins. Every hour spent deeply understanding business requirements in week one is worth ten hours of rework in month six.',
      'This is why every project at Aknexis begins with a Technical Discovery phase that is often longer than clients expect. Not because we move slowly — but because we\'ve learned, painfully, what happens when you don\'t.',
    ],
  },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = ARTICLE_STUBS[params.slug]
  if (!article) return { title: 'Article Not Found | Aknexis' }
  return {
    title:       `${article.title} | Aknexis Insights`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = ARTICLE_STUBS[params.slug]

  if (!article) {
    return (
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <h1 className="font-display font-700 text-2xl text-slate-200 mb-4">Article not found</h1>
            <Link href="/insights" className="text-accent-400 hover:text-accent-300 transition-colors">
              ← Back to Insights
            </Link>
          </div>
        </PageContainer>
      </SectionWrapper>
    )
  }

  return (
    <>
      <SectionWrapper spacing="lg" className="pt-28">
        <PageContainer size="narrow">

          {/* Back */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Insights
          </Link>

          {/* Article header */}
          <div className="mb-10">
            <span className="label-chip mb-5 inline-flex">{article.category}</span>
            <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-50 leading-tight tracking-tight mb-6">
              {article.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">{article.excerpt}</p>

            {/* Author + meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.07]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </div>

          {/* Article body */}
          <article className="prose prose-invert prose-slate max-w-none">
            {article.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-400 leading-[1.8] text-base sm:text-lg mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* More articles CTA */}
          <div className="mt-16 pt-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-1">Read more insights</p>
              <p className="text-xs text-slate-600">Perspectives on enterprise technology and strategy</p>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/25 hover:border-accent-600/40 text-accent-400 text-sm font-semibold rounded-xl transition-all duration-200 group flex-shrink-0"
            >
              View all articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </PageContainer>
      </SectionWrapper>

      <CTABanner title="Want to work with the team behind these insights?" subtitle="The same thinking that goes into our writing goes into every project we take on." primaryLabel="Start a Conversation" />
    </>
  )
}
