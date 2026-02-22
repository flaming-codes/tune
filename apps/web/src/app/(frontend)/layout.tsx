import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import '@med/theme/global.css'
import { Inter } from 'next/font/google'

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

  return {
    title: siteSettings.seo?.title || 'Tierarztpraxis',
    description: siteSettings.seo?.description || '',
    openGraph: {
      title: siteSettings.seo?.title || 'Tierarztpraxis',
      description: siteSettings.seo?.description || '',
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
        {children}
      </body>
    </html>
  )
}
