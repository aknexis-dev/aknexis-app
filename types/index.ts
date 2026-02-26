// ============================================================
// Navigation Types
// ============================================================
export interface NavItem {
  label: string
  href: string
  children?: NavSubItem[]
}

export interface NavSubItem {
  label: string
  href: string
  description?: string
}

// ============================================================
// Lead / Form Types
// ============================================================
export type ServiceInterest =
  | 'software_engineering'
  | 'growth_intelligence'
  | 'business_foundation'
  | 'not_sure'

export interface LeadFormData {
  fullName: string
  email: string
  phone?: string
  companyName: string
  jobTitle?: string
  serviceInterest: ServiceInterest
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ============================================================
// Case Study Types
// ============================================================
export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  serviceType: ServiceInterest
  challenge: string
  solution: string
  outcomes: string[]
  metrics: CaseStudyMetric[]
  tags: string[]
  publishedAt: string
  featured?: boolean
}

export interface CaseStudyMetric {
  label: string
  value: string
  direction?: 'up' | 'down' | 'neutral'
}

// ============================================================
// Blog / Insights Types
// ============================================================
export type BlogCategory =
  | 'technology'
  | 'strategy'
  | 'operations'
  | 'industry'
  | 'leadership'

export interface BlogArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  author: BlogAuthor
  publishedAt: string
  readingTime: number
  featured?: boolean
  tags: string[]
}

export interface BlogAuthor {
  name: string
  role: string
  avatarUrl?: string
}

// ============================================================
// Service Types
// ============================================================
export interface Service {
  id: ServiceInterest
  title: string
  tagline: string
  description: string
  icon: string
  href: string
  features: string[]
  outcomes: string[]
}

// ============================================================
// Industry Types
// ============================================================
export interface Industry {
  id: string
  name: string
  description: string
  icon: string
  useCases: string[]
}

// ============================================================
// Pricing Types
// ============================================================
export type EngagementModel = 'project' | 'retainer' | 'advisory'

export interface PricingTier {
  id: string
  name: string
  tagline: string
  model: EngagementModel
  features: string[]
  idealFor: string
  ctaLabel: string
  highlighted?: boolean
}

// ============================================================
// Career Types
// ============================================================
export interface JobRole {
  id: string
  title: string
  department: string
  type: 'full_time' | 'part_time' | 'internship' | 'contract'
  location: string
  remote: boolean
  description: string
  requirements: string[]
}

// ============================================================
// Generic Component Props
// ============================================================
export interface ClassNameProp {
  className?: string
}

export interface ChildrenProp {
  children: React.ReactNode
}

export interface SectionProps extends ClassNameProp {
  id?: string
  children: React.ReactNode
}

export interface ButtonProps extends ClassNameProp {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  href?: string
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export interface CardProps extends ClassNameProp {
  children: React.ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export interface StatItem {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}
