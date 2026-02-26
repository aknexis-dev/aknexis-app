import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aknexis.io'

  const routes = [
    { url: '/',                              priority: 1.0 },
    { url: '/about',                         priority: 0.9 },
    { url: '/services',                      priority: 0.9 },
    { url: '/services/software-engineering', priority: 0.8 },
    { url: '/services/growth-intelligence',  priority: 0.8 },
    { url: '/services/business-foundation',  priority: 0.8 },
    { url: '/case-studies',                  priority: 0.8 },
    { url: '/industries',                    priority: 0.7 },
    { url: '/pricing',                       priority: 0.8 },
    { url: '/careers',                       priority: 0.6 },
    { url: '/insights',                      priority: 0.7 },
    { url: '/contact',                       priority: 0.9 },
  ]

  return routes.map(({ url, priority }) => ({
    url:             `${BASE_URL}${url}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))
}
