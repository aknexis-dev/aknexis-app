export const ANIMATION = {
  duration: {
    fast:    150,
    normal:  250,
    slow:    350,
    slower:  500,
    slowest: 700,
  },
  easing: {
    enterprise: 'cubic-bezier(0.16, 1, 0.3, 1)',
    smooth:     'cubic-bezier(0.4, 0, 0.2, 1)',
    out:        'cubic-bezier(0, 0, 0.2, 1)',
    in:         'cubic-bezier(0.4, 0, 1, 1)',
  },
  delay: {
    none:    0,
    short:   75,
    medium:  150,
    long:    225,
    longer:  300,
    longest: 450,
  },
} as const

// Stagger delay for list items (ms)
export function getStaggerDelay(index: number, base = 75): number {
  return index * base
}

// Intersection observer options for scroll reveal
export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
}
