import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { SiteSetting, TeamMember, Testimonial, GalleryImage } from '@/payload-types'

import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { Gallery } from './sections/Gallery'
import { Team } from './sections/Team'
import { Hours } from './sections/Hours'
import { Contact } from './sections/Contact'
import { Footer } from './components/Footer'

async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  return settings as SiteSetting
}

async function getTeamMembers(): Promise<TeamMember[]> {
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
  return docs as TeamMember[]
}

async function getTestimonials(): Promise<Testimonial[]> {
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
  return docs as Testimonial[]
}

async function getGalleryImages(): Promise<GalleryImage[]> {
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
  return docs as GalleryImage[]
}

export default async function HomePage() {
  const [siteSettings, teamMembers, testimonials, galleryImages] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
    getTestimonials(),
    getGalleryImages(),
  ])

  return (
    <>
      <Navigation 
        practiceName={siteSettings.practiceName} 
        navLinks={siteSettings.navigation ?? []}
        phone={siteSettings.contact.phone}
      />
      <main>
        <Hero hero={siteSettings.hero} />
        <Services />
        <Testimonials testimonials={testimonials} />
        <Gallery images={galleryImages} />
        <Team members={teamMembers} />
        <Hours 
          openingHours={siteSettings.openingHours ?? []} 
          emergency={siteSettings.emergency}
          phone={siteSettings.contact.phone}
        />
        <Contact contact={siteSettings.contact} />
      </main>
      <Footer 
        practiceName={siteSettings.practiceName}
        footer={siteSettings.footer}
        contact={siteSettings.contact}
        navLinks={siteSettings.navigation ?? []}
      />
    </>
  )
}
