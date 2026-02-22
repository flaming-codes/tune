import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { LegalPage } from '../components/LegalPage'
import { getFrontendShellData } from '@/lib/frontendShell'

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

export default async function ImprintPageRoute() {
  const { shell, imprintPage } = await getData()

  return (
    <LegalPage
      pageTitle={imprintPage.pageTitle || 'Impressum'}
      content={imprintPage.content || {}}
      practiceName={shell.practiceName}
      navLinks={shell.navLinks}
      phone={shell.phone}
      footer={shell.footer}
      contact={shell.contact}
    />
  )
}
