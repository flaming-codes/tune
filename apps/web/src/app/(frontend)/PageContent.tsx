'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'

import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { RenderLayoutBlock } from './sections/RenderLayoutBlock'

import type { StartPage, TeamMember, Testimonial, GalleryImage } from '@/payload-types'
import { envClient } from '@/env/client'

type StartPageBlock = NonNullable<StartPage['layout']>[number]
type StartPageHeaderBlock = NonNullable<StartPage['header']>[number]
type StartPageFooterBlock = NonNullable<StartPage['footer']>[number]

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

function findLayoutBlock<TType extends StartPageBlock['blockType']>(
  blocks: StartPage['layout'] | undefined | null,
  blockType: TType,
): Extract<StartPageBlock, { blockType: TType }> | null {
  if (!Array.isArray(blocks)) return null
  return (
    blocks.find(
      (block): block is Extract<StartPageBlock, { blockType: TType }> =>
        block.blockType === blockType,
    ) || null
  )
}

interface PageContentProps {
  initialStartPage: StartPage
  teamMembers: TeamMember[]
  testimonials: Testimonial[]
  galleryImages: GalleryImage[]
}

export function PageContent({
  initialStartPage,
  teamMembers,
  testimonials,
  galleryImages,
}: PageContentProps) {
  const { data: liveStartPage } = useLivePreview<StartPage>({
    initialData: initialStartPage,
    serverURL: envClient.NEXT_PUBLIC_PAYLOAD_URL,
    depth: 2,
  })

  // Use live data when available, otherwise fall back to initial data
  const startPage = liveStartPage || initialStartPage

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
        {(startPage.layout || []).map((block, index) => {
          return (
            <RenderLayoutBlock
              key={`${block.blockType}-${index}`}
              block={block}
              index={index}
              teamMembers={teamMembers}
              testimonials={testimonials}
              galleryImages={galleryImages}
              primaryPhone={primaryPhone}
            />
          )
        })}
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
