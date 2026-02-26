import { cn } from '@/lib/utils/cn'

interface TextProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function HeroHeading({ children, className, as: Tag = 'h1' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-display font-800 tracking-tight text-balance',
        'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
        'leading-[1.05] sm:leading-[1.05]',
        'text-slate-50',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function SectionTitle({ children, className, as: Tag = 'h2' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-display font-700 tracking-tight text-balance',
        'text-3xl sm:text-4xl lg:text-5xl',
        'leading-[1.15]',
        'text-slate-50',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function Subheading({ children, className, as: Tag = 'h3' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-display font-600 tracking-tight',
        'text-xl sm:text-2xl',
        'leading-snug',
        'text-slate-100',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function CardTitle({ children, className, as: Tag = 'h3' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-display font-700 tracking-tight',
        'text-lg sm:text-xl',
        'text-slate-100',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function BodyText({ children, className, as: Tag = 'p' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-sans text-slate-400 leading-relaxed',
        'text-base sm:text-lg',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function SmallText({ children, className, as: Tag = 'p' }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-sans text-slate-500 leading-relaxed',
        'text-sm',
        className
      )}
    >
      {children}
    </Tag>
  )
}

interface LabelProps {
  children: React.ReactNode
  className?: string
  dot?: boolean
}

export function SectionLabel({ children, className, dot = true }: LabelProps) {
  return (
    <div className={cn('label-chip', className)}>
      {dot && <span className="accent-dot w-1.5 h-1.5" />}
      {children}
    </div>
  )
}
