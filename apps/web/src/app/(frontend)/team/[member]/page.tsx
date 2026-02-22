import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { RenderLayoutBlock } from '../../sections/RenderLayoutBlock'

import type { GalleryImage, StartPage, TeamMember, Testimonial } from '@/payload-types'

type StartPageHeaderBlock = NonNullable<StartPage['header']>[number]
type StartPageFooterBlock = NonNullable<StartPage['footer']>[number]
type StartPageLayoutBlock = NonNullable<StartPage['layout']>[number]

function findHeaderBlock<TType extends StartPageHeaderBlock['blockType']>(
  blocks: StartPage['header'] | undefined | null,
  blockType: TType,
): Extract<StartPageHeaderBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageHeaderBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function findFooterBlock<TType extends StartPageFooterBlock['blockType']>(
  blocks: StartPage['footer'] | undefined | null,
  blockType: TType,
): Extract<StartPageFooterBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageFooterBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

function findLayoutBlock<TType extends StartPageLayoutBlock['blockType']>(
  blocks: StartPage['layout'] | undefined | null,
  blockType: TType,
): Extract<StartPageLayoutBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageLayoutBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

async function getStartPage() {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'start-page',
    depth: 2,
  })
}

async function getTeamMemberBySlug(memberSlug: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'team-members',
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: memberSlug,
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
  })

  return docs[0] || null
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

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ member: string }>
}) {
  const { member: memberSlug } = await params

  const [startPage, teamMember, teamMembers, testimonials, galleryImages] = await Promise.all([
    getStartPage(),
    getTeamMemberBySlug(memberSlug),
    getTeamMembers(),
    getTestimonials(),
    getGalleryImages(),
  ])

  if (!teamMember) {
    notFound()
  }

  const navBlock = findHeaderBlock(startPage.header, 'navigation')
  const footerBlock = findFooterBlock(startPage.footer, 'footer')
  const contactBlock = findLayoutBlock(startPage.layout, 'contact')

  const practiceName = navBlock?.practiceName || 'Tierarztpraxis'
  const navLinks = navBlock?.links || []
  const primaryPhone = navBlock?.phone || contactBlock?.phone || ''

  return (
    <>
      <Navigation practiceName={practiceName} navLinks={navLinks} phone={primaryPhone} />
      <main>
        {(teamMember.memberPageLayout || []).map((block, index) => (
          <RenderLayoutBlock
            key={`${block.blockType}-${index}`}
            block={block}
            index={index}
            teamMembers={teamMembers as TeamMember[]}
            testimonials={testimonials as Testimonial[]}
            galleryImages={galleryImages as GalleryImage[]}
            primaryPhone={primaryPhone}
            activeMember={teamMember}
          />
        ))}
      </main>
      <Footer
        practiceName={practiceName}
        footer={{
          tagline: footerBlock?.tagline || '',
          copyright: footerBlock?.copyright || '',
        }}
        contact={{
          address: contactBlock?.address || { street: '', city: '' },
          phone: contactBlock?.phone || primaryPhone,
          email: contactBlock?.email || '',
        }}
        navLinks={navLinks}
      />
    </>
  )
}
