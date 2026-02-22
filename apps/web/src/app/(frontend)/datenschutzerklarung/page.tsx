import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { LegalPage } from '../components/LegalPage'
import { getFrontendShellData } from '@/lib/frontendShell'

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

export default async function PrivacyPolicyPageRoute() {
  const { shell, privacyPolicyPage } = await getData()

  return (
    <LegalPage
      pageTitle={privacyPolicyPage.pageTitle || 'Datenschutzerklärung'}
      content={privacyPolicyPage.content || {}}
      practiceName={shell.practiceName}
      navLinks={shell.navLinks}
      phone={shell.phone}
      footer={shell.footer}
      contact={shell.contact}
    />
  )
}
