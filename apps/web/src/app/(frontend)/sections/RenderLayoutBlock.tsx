'use client'

import React from 'react'

import { Hero } from './Hero'
import { Services } from './Services'
import { Quote } from './Quote'
import { Testimonials } from './Testimonials'
import { Gallery } from './Gallery'
import { Team } from './Team'
import { Hours } from './Hours'
import { Contact } from './Contact'
import { ContactFormSection } from './ContactFormSection'
import { Accordion } from './Accordion'
import { MemberHero } from './teamMember/MemberHero'
import { MemberCv } from './teamMember/MemberCv'
import { MemberSentenceList } from './teamMember/MemberSentenceList'

import type { GalleryImage, StartPage, TeamMember, Testimonial } from '@/payload-types'

type StartPageBlock = NonNullable<StartPage['layout']>[number]
type TeamMemberPageBlock = NonNullable<TeamMember['memberPageLayout']>[number]

type LayoutBlock = StartPageBlock | TeamMemberPageBlock

interface RenderLayoutBlockProps {
  block: LayoutBlock
  index: number
  teamMembers: TeamMember[]
  testimonials: Testimonial[]
  galleryImages: GalleryImage[]
  primaryPhone: string
  activeMember?: TeamMember | null
}

export function RenderLayoutBlock({
  block,
  index,
  teamMembers,
  testimonials,
  galleryImages,
  primaryPhone,
  activeMember,
}: RenderLayoutBlockProps) {
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
            googleReviewUrl: block.googleReviewUrl,
            reviewCount: block.reviewCount,
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
    case 'accordion':
      return (
        <Accordion
          key={key}
          content={{
            eyebrow: block.eyebrow,
            headline: block.headline,
            description: block.description,
            items: (block.items || []).map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            })),
            allowMultipleOpen: block.allowMultipleOpen,
            alignment: block.alignment,
          }}
        />
      )
    case 'memberHero':
      return (
        <MemberHero
          key={key}
          memberName={activeMember?.name || ''}
          memberRole={activeMember?.role || ''}
          content={{
            variant: block.variant,
            eyebrow: block.eyebrow,
            headline: block.headline,
            subheadline: block.subheadline,
            description: block.description,
            coverImage: block.coverImage,
            ctaLabel: block.ctaLabel,
            ctaHref: block.ctaHref,
          }}
        />
      )
    case 'memberCv':
      return (
        <MemberCv
          key={key}
          content={{
            eyebrow: block.eyebrow,
            headline: block.headline,
            entries: (block.entries || []).map((entry) => ({
              id: entry.id,
              period: entry.period,
              title: entry.title,
              institution: entry.institution,
              description: entry.description,
            })),
          }}
        />
      )
    case 'memberSentenceList':
      return (
        <MemberSentenceList
          key={key}
          content={{
            sentenceStart: block.sentenceStart,
            items: (block.items || []).map((item) => ({
              id: item.id,
              text: item.text,
            })),
          }}
        />
      )
    default:
      return null
  }
}
