import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { PageContent } from './PageContent'
import { JsonLdScripts } from './components/JsonLdScripts'
import { buildStartPageJsonLd } from '@/lib/jsonLd'

async function getStartPage() {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'start-page',
    depth: 2,
  })
}

async function getTeamMembers() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'team-members',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'sortOrder',
  })
  return docs
}

async function getTestimonials() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'sortOrder',
  })
  return docs
}

async function getGalleryImages() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gallery-images',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'sortOrder',
  })
  return docs
}

export default async function HomePage() {
  const [startPage, teamMembers, testimonials, galleryImages] = await Promise.all([
    getStartPage(),
    getTeamMembers(),
    getTestimonials(),
    getGalleryImages(),
  ])

  const jsonLdItems = buildStartPageJsonLd({
    startPage,
    teamMembers,
    testimonials,
  })

  return (
    <>
      <JsonLdScripts scriptIdPrefix="home-jsonld" items={jsonLdItems} />
      <PageContent
        initialStartPage={startPage}
        teamMembers={teamMembers}
        testimonials={testimonials}
        galleryImages={galleryImages}
      />
    </>
  )
}
