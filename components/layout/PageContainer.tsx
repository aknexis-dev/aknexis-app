import { cn } from '@/lib/utils/cn'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export function PageContainer({ children, className, size = 'default' }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-7xl',
        size === 'narrow'  && 'max-w-4xl',
        size === 'wide'    && 'max-w-[1400px]',
        className
      )}
    >
      {children}
    </div>
  )
}

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'surface' | 'elevated' | 'none'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

export function SectionWrapper({
  children,
  className,
  id,
  background = 'default',
  spacing = 'lg',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        background === 'default'  && 'bg-transparent',
        background === 'surface'  && 'bg-navy-900/40',
        background === 'elevated' && 'bg-navy-850/50',
        background === 'none'     && '',
        spacing === 'sm'  && 'py-12 lg:py-16',
        spacing === 'md'  && 'py-16 lg:py-20',
        spacing === 'lg'  && 'py-20 lg:py-28',
        spacing === 'xl'  && 'py-28 lg:py-36',
        className
      )}
    >
      {children}
    </section>
  )
}
