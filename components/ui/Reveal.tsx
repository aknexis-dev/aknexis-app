'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { cn } from '@/lib/utils/cn'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'fade'
}

export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const { ref, revealed } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        direction === 'up' && !revealed  && 'opacity-0 translate-y-6',
        direction === 'fade' && !revealed && 'opacity-0',
        revealed && 'opacity-100 translate-y-0',
        className
      )}
    >
      {children}
    </div>
  )
}

interface RevealGroupProps {
  children: React.ReactNode[]
  className?: string
  stagger?: number
  containerClassName?: string
}

export function RevealGroup({ children, className, stagger = 100, containerClassName }: RevealGroupProps) {
  const { ref, revealed } = useScrollReveal()

  return (
    <div ref={ref} className={containerClassName}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{ transitionDelay: revealed ? `${i * stagger}ms` : '0ms' }}
          className={cn(
            'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            !revealed && 'opacity-0 translate-y-6',
            revealed && 'opacity-100 translate-y-0',
            className
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
