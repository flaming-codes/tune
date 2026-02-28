import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import '@med/theme/global.css'
import './link-underline.css'
import { Inter } from 'next/font/google'
import { AnalyticsTracker } from './components/AnalyticsTracker'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

async function getSiteSettings() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'start-page',
  })
  return settings
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const metaTitle = siteSettings.meta?.title || 'Tierarztpraxis'
  const metaDescription = siteSettings.meta?.description || ''
  const metaImageUrl =
    siteSettings.meta?.image && typeof siteSettings.meta.image === 'object'
      ? siteSettings.meta.image.url || ''
      : ''

  return {
    title: metaTitle,
    description: metaDescription,
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    alternates: siteSettings.meta?.canonicalUrl
      ? {
          canonical: siteSettings.meta.canonicalUrl,
        }
      : undefined,
    robots: siteSettings.meta?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: metaImageUrl
        ? [
            {
              url: metaImageUrl,
            },
          ]
        : undefined,
      type: 'website',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${inter.className} theme-bg-primary theme-text-primary antialiased theme-transition`}
      >
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
