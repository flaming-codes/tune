import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { LegalPage } from '../components/LegalPage'
import { JsonLdScripts } from '../components/JsonLdScripts'
import { getFrontendShellData } from '@/lib/frontendShell'
import { buildImprintPageJsonLd } from '@/lib/jsonLd'

async function getData() {
  const payload = await getPayload({ config })

  const [startPage, imprintPage] = await Promise.all([
    payload.findGlobal({ slug: 'start-page', depth: 1 }),
    payload.findGlobal({ slug: 'imprint-page', depth: 1 }),
  ])

  return {
    shell: getFrontendShellData(startPage),
    imprintPage,
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { imprintPage } = await getData()
  const metaTitle = imprintPage.meta?.title || imprintPage.pageTitle || 'Impressum'
  const metaDescription = imprintPage.meta?.description || ''
  const metaImageUrl =
    imprintPage.meta?.image && typeof imprintPage.meta.image === 'object'
      ? imprintPage.meta.image.url || ''
      : ''

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: imprintPage.meta?.canonicalUrl
      ? {
          canonical: imprintPage.meta.canonicalUrl,
        }
      : undefined,
    robots: imprintPage.meta?.noIndex
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
      type: 'article',
    },
  }
}

export default async function ImprintPageRoute() {
  const { shell, imprintPage } = await getData()

  const jsonLdItems = buildImprintPageJsonLd({
    imprintPage,
    practiceName: shell.practiceName,
    phone: shell.contact.phone,
    email: shell.contact.email,
  })

  return (
    <>
      <JsonLdScripts scriptIdPrefix="imprint-jsonld" items={jsonLdItems} />
      <LegalPage
        pageTitle={imprintPage.pageTitle || 'Impressum'}
        content={imprintPage.content || {}}
        practiceName={shell.practiceName}
        navLinks={shell.navLinks}
        phone={shell.phone}
        footer={shell.footer}
        contact={shell.contact}
      />
    </>
  )
}
