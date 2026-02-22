import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { LegalPage } from '../components/LegalPage'
import { JsonLdScripts } from '../components/JsonLdScripts'
import { getFrontendShellData } from '@/lib/frontendShell'
import { buildPrivacyPolicyPageJsonLd } from '@/lib/jsonLd'

async function getData() {
  const payload = await getPayload({ config })

  const [startPage, privacyPolicyPage] = await Promise.all([
    payload.findGlobal({ slug: 'start-page', depth: 1 }),
    payload.findGlobal({ slug: 'privacy-policy-page', depth: 1 }),
  ])

  return {
    shell: getFrontendShellData(startPage),
    privacyPolicyPage,
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { privacyPolicyPage } = await getData()
  const metaTitle =
    privacyPolicyPage.meta?.title || privacyPolicyPage.pageTitle || 'Datenschutzerklärung'
  const metaDescription = privacyPolicyPage.meta?.description || ''
  const metaImageUrl =
    privacyPolicyPage.meta?.image && typeof privacyPolicyPage.meta.image === 'object'
      ? privacyPolicyPage.meta.image.url || ''
      : ''

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: privacyPolicyPage.meta?.canonicalUrl
      ? {
          canonical: privacyPolicyPage.meta.canonicalUrl,
        }
      : undefined,
    robots: privacyPolicyPage.meta?.noIndex
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

export default async function PrivacyPolicyPageRoute() {
  const { shell, privacyPolicyPage } = await getData()

  const jsonLdItems = buildPrivacyPolicyPageJsonLd({
    privacyPolicyPage,
    practiceName: shell.practiceName,
    phone: shell.contact.phone,
    email: shell.contact.email,
  })

  return (
    <>
      <JsonLdScripts scriptIdPrefix="privacy-jsonld" items={jsonLdItems} />
      <LegalPage
        pageTitle={privacyPolicyPage.pageTitle || 'Datenschutzerklärung'}
        content={privacyPolicyPage.content || {}}
        practiceName={shell.practiceName}
        navLinks={shell.navLinks}
        phone={shell.phone}
        footer={shell.footer}
        contact={shell.contact}
      />
    </>
  )
}
