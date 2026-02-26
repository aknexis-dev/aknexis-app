import Link from 'next/link'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent-outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  href?: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  external?: boolean
}

const variants = {
  primary:
    'bg-accent-600 hover:bg-accent-700 text-white shadow-[0_0_0_1px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-transparent',
  secondary:
    'bg-white/[0.06] hover:bg-white/[0.10] text-slate-100 border border-white/[0.10] hover:border-white/[0.18]',
  ghost:
    'bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-slate-100 border border-transparent',
  'accent-outline':
    'bg-accent-600/10 hover:bg-accent-600/20 text-accent-400 border border-accent-600/30 hover:border-accent-600/50',
}

const sizes = {
  sm:  'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  md:  'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg:  'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  href,
  children,
  className,
  icon,
  iconPosition = 'right',
  external = false,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {content}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )
    }
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={base}
    >
      {content}
    </button>
  )
}

// Pre-built CTAs
export function CTAButton({ href = '/contact', children = 'Book Consultation', className }: { href?: string; children?: React.ReactNode; className?: string }) {
  return (
    <Button href={href} variant="primary" size="lg" className={className} icon={<ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}>
      {children}
    </Button>
  )
}

export function SecondaryButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Button href={href} variant="secondary" size="lg" className={className}>
      {children}
    </Button>
  )
}
