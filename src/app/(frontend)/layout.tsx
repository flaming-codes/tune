import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'

async function getSiteSettings() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  return settings
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings.seo.title,
    description: siteSettings.seo.description,
    openGraph: {
      title: siteSettings.seo.title,
      description: siteSettings.seo.description,
      type: 'website',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-bg-primary theme-text-primary antialiased theme-transition">
        {children}
      </body>
    </html>
  )
}
