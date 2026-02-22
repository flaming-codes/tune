import React from 'react'
import type { Metadata } from 'next'
import '@med/theme/global.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Signatures CMS',
  description: 'Signatures app powered by PayloadCMS and Next.js',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} theme-bg-primary theme-text-primary antialiased theme-transition`}
      >
        {children}
      </body>
    </html>
  )
}
