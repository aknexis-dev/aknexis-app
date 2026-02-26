import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Software Engineering',
        href: '/services/software-engineering',
        description: 'Custom platforms, APIs & enterprise systems',
      },
      {
        label: 'Growth & Intelligence',
        href: '/services/growth-intelligence',
        description: 'Data strategy, analytics & digital growth',
      },
      {
        label: 'Business Foundation',
        href: '/services/business-foundation',
        description: 'Operations, automation & digital infrastructure',
      },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Industries',   href: '/industries' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Careers',      href: '/careers' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Contact',      href: '/contact' },
]

export const SITE_NAME    = 'aknexis'
export const SITE_TAGLINE = 'Enterprise Software. Built for Scale.'
export const SITE_EMAIL   = 'hello@aknexis.io'
export const SITE_PHONE   = '+1 (800) 000-0000'
export const SITE_ADDRESS = 'New York · San Francisco · Austin'
