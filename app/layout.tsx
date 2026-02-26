import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'
import { SITE_METADATA } from '@/lib/site.metadata'

export const metadata: Metadata = {
  title:       { default: SITE_METADATA.base.title, template: '%s | Aknexis' },
  description: SITE_METADATA.base.description,
  keywords:    SITE_METADATA.base.keywords,
  authors:     [{ name: 'Aknexis' }],
  robots:      { index: true, follow: true },
  openGraph: {
    type:        'website',
    siteName:    'Aknexis',
    title:       SITE_METADATA.base.title,
    description: SITE_METADATA.base.description,
    url:         SITE_METADATA.base.canonical,
    images:      [{ url: SITE_METADATA.base.ogImage, width: 1200, height: 630, alt: 'Aknexis' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE_METADATA.base.title,
    description: SITE_METADATA.base.description,
    images:      [SITE_METADATA.base.ogImage],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
