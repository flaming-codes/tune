import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ImprintPage } from '@/payload-types'

import { Footer } from './Footer'
import { Navigation } from './Navigation'

interface NavLink {
  label: string
  href: string
  id?: string | null
}

interface LegalPageProps {
  pageTitle: string
  content: ImprintPage['content']
  practiceName: string
  navLinks: NavLink[]
  phone: string
  footer: {
    tagline: string
    copyright: string
  }
  contact: {
    address: {
      street: string
      city: string
      additional?: string | null
    }
    phone: string
    email: string
  }
}

export function LegalPage({
  pageTitle,
  content,
  practiceName,
  navLinks,
  phone,
  footer,
  contact,
}: LegalPageProps) {
  return (
    <>
      <Navigation practiceName={practiceName} navLinks={navLinks} phone={phone} />
      <main className="pt-44 pb-20">
        <section className="max-w-4xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight-custom theme-text-primary mb-8">
            {pageTitle}
          </h1>
          <div className="text-sm md:text-base theme-text-secondary leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight-custom [&_h2]:theme-text-primary [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
            <RichText data={content} />
          </div>
        </section>
      </main>
      <Footer practiceName={practiceName} footer={footer} contact={contact} navLinks={navLinks} />
    </>
  )
}
