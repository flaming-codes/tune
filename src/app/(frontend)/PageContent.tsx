'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'

import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { Quote } from './sections/Quote'
import { Gallery } from './sections/Gallery'
import { Team } from './sections/Team'
import { Hours } from './sections/Hours'
import { Contact } from './sections/Contact'
import { ContactFormSection } from './sections/ContactFormSection'
import { Footer } from './components/Footer'

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
          const key = `${block.blockType}-${index}`

          switch (block.blockType) {
            case 'hero':
              return (
                <Hero
                  key={key}
                  hero={{
                    headline: block.headline,
                    subheadline: block.subheadline,
                    description: block.description,
                    heroImage: block.heroImage,
                    ctaPrimaryText: block.ctaPrimaryText,
                    ctaPrimaryHref: block.ctaPrimaryHref,
                    ctaSecondaryText: block.ctaSecondaryText,
                    ctaSecondaryHref: block.ctaSecondaryHref,
                  }}
                />
              )
            case 'services':
              return (
                <Services
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    groups: (block.groups || []).map((group) => ({
                      id: group.id,
                      category: group.category,
                      items: (group.items || []).map((item) => ({
                        id: item.id,
                        text: item.text,
                      })),
                    })),
                    ctaText: block.ctaText,
                    ctaButtonLabel: block.ctaButtonLabel,
                    ctaButtonHref: block.ctaButtonHref,
                  }}
                />
              )
            case 'quote':
              return (
                <Quote
                  key={key}
                  quote={{
                    text: block.text,
                    author: block.author,
                  }}
                />
              )
            case 'testimonials':
              return (
                <Testimonials
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                  }}
                  testimonials={testimonials}
                />
              )
            case 'gallery':
              return (
                <Gallery
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                    emptyStateText: block.emptyStateText,
                  }}
                  images={galleryImages}
                />
              )
            case 'team':
              return (
                <Team
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                  }}
                  members={teamMembers}
                />
              )
            case 'hours':
              return (
                <Hours
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                    openingHours: (block.openingHours || []).map((item) => ({
                      id: item.id,
                      day: item.day,
                      state: item.state,
                      times: item.times,
                    })),
                    emergency: {
                      title: block.emergency.title,
                      description: block.emergency.description,
                    },
                  }}
                  phone={primaryPhone}
                />
              )
            case 'contact':
              return (
                <Contact
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                    address: {
                      street: block.address.street,
                      city: block.address.city,
                      additional: block.address.additional,
                    },
                    phone: block.phone,
                    email: block.email,
                    consultationTimes: block.consultationTimes,
                    directionsDescription: block.directionsDescription,
                    directionsLinkLabel: block.directionsLinkLabel,
                  }}
                />
              )
            case 'contactForm':
              return (
                <ContactFormSection
                  key={key}
                  content={{
                    eyebrow: block.eyebrow,
                    headline: block.headline,
                    description: block.description,
                  }}
                />
              )
            default:
              return null
          }
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
