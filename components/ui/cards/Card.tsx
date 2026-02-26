import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
  glow?: boolean
  as?: 'div' | 'article' | 'li'
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({ children, className, hover = false, padding = 'md', glow = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'card-surface rounded-2xl',
        paddings[padding],
        hover && 'card-surface-hover cursor-default',
        glow && 'glow-ring',
        className
      )}
    >
      {children}
    </Tag>
  )
}

// Glass card variant
export function GlassCard({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        paddings[padding],
        hover && 'card-surface-hover cursor-default',
        className
      )}
    >
      {children}
    </div>
  )
}

// Feature card with icon
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  badge?: string
}

export function FeatureCard({ icon, title, description, className, badge }: FeatureCardProps) {
  return (
    <Card hover padding="lg" className={cn('group', className)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 group-hover:bg-accent-600/15 group-hover:border-accent-600/30 transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  )
}

// Stat block
interface StatBlockProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
  className?: string
}

export function StatBlock({ value, label, prefix, suffix, className }: StatBlockProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-baseline gap-0.5">
        {prefix && <span className="text-lg font-display font-700 text-accent-400">{prefix}</span>}
        <span className="text-4xl font-display font-800 gradient-text">{value}</span>
        {suffix && <span className="text-lg font-display font-700 text-accent-400">{suffix}</span>}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}

// Testimonial card
interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  className?: string
}

export function TestimonialCard({ quote, author, role, company, className }: TestimonialCardProps) {
  return (
    <Card hover padding="lg" className={cn('flex flex-col gap-5', className)}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-accent-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center text-white text-xs font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">{author}</p>
          <p className="text-xs text-slate-500">{role} · {company}</p>
        </div>
      </div>
    </Card>
  )
}
