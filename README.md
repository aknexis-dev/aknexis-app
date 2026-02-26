# AKnexis — Enterprise B2B Platform Frontend

Production-ready Next.js frontend for a national-level B2B enterprise software company.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Syne (display) + Plus Jakarta Sans (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
stratis/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, metadata, header/footer)
│   ├── page.tsx                  # Homepage
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx              # Services overview
│   │   ├── software-engineering/page.tsx
│   │   ├── growth-intelligence/page.tsx
│   │   └── business-foundation/page.tsx
│   ├── case-studies/page.tsx
│   ├── industries/page.tsx
│   ├── pricing/page.tsx
│   ├── careers/page.tsx
│   ├── insights/
│   │   ├── page.tsx              # Article listing
│   │   └── [slug]/page.tsx       # Article detail
│   ├── contact/page.tsx
│   ├── admin/
│   │   ├── layout.tsx            # Dashboard shell
│   │   ├── page.tsx              # Dashboard overview
│   │   └── login/page.tsx        # Admin login
│   └── api/leads/route.ts        # Lead capture API
├── components/
│   ├── layout/                   # Header, Footer, PageContainer, SectionWrapper
│   ├── ui/                       # Buttons, Cards, Typography, Reveal
│   ├── forms/                    # ContactForm + validation
│   └── sections/                 # HeroSection, TrustIndicators, ServicesPreview, CTABanner
├── lib/
│   ├── api/                      # API layer (leads.api.ts)
│   ├── hooks/                    # useScrollReveal
│   ├── utils/                    # cn, validation, dates
│   ├── navigation.config.ts      # Nav items + site constants
│   ├── site.metadata.ts          # SEO metadata per route
│   └── animation.config.ts       # Motion timing constants
├── types/index.ts                # All shared TypeScript types
└── styles/globals.css            # Tailwind base + design system utilities
```

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `navy-950` | `#03060F` | Page background |
| `navy-900` | `#050A16` | Primary background |
| `navy-800` | `#0A1120` | Surface |
| `accent-600` | `#2563EB` | Primary CTA, active states |
| `teal-400` | `#2DD4BF` | Success, secondary highlights |
| `slate-50` | `#F8FAFC` | Primary text |
| `slate-400` | `#94A3B8` | Secondary text |
| `slate-600` | `#475569` | Muted text, borders |

### Typography Scale
| Component | Font | Size | Weight |
|---|---|---|---|
| Hero heading | Syne | clamp(2.5rem, 7vw, 5rem) | 800 |
| Section title | Syne | 3xl–5xl | 700 |
| Subheading | Syne | xl–2xl | 600 |
| Body | Plus Jakarta Sans | base–lg | 400 |
| Label | Plus Jakarta Sans | xs | 500 |

### Key CSS Utilities
```
.glass               Frosted glass surface (backdrop-blur)
.glass-elevated      Stronger glass for dropdowns/modals
.card-surface        Standard card background + border
.card-surface-hover  Card with smooth hover lift animation
.gradient-text       White → blue → teal gradient text
.gradient-text-blue  Blue-only gradient text
.label-chip          Pill badge with accent border
.accent-dot          Glowing blue dot indicator
.bg-grid             Subtle grid dot background
.divider             Horizontal gradient separator line
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Phase 2 Integration

The lead form (`/contact`) is Phase-2 ready:
- Frontend validation fully implemented (Zod + React Hook Form)
- API route at `/api/leads` exists with validation
- Success/error/loading states implemented
- To activate: uncomment the MongoDB + email lines in `app/api/leads/route.ts`

## Scripts

```bash
npm run dev         # Start development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # ESLint check
npm run type-check  # TypeScript check (no emit)
```

## Deployment

Deploy to Vercel:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Every push to `main` triggers a production deployment
4. Every PR gets a preview URL automatically
