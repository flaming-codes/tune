import type { Payload } from 'payload'

import { seedMedia } from './media'
import { seedStartPage } from './startPage'
import { seedLegalPages } from './legal-pages'
import { seedTeamMembers } from './team-members'
import { seedGalleryImages } from './gallery-images'
import { seedTestimonials } from './testimonials'

export async function seed(payload: Payload, overwrite = false): Promise<void> {
  const mediaId = await seedMedia(payload, overwrite)

  await seedStartPage(payload, overwrite, mediaId)
  await seedLegalPages(payload, overwrite)
  await seedTeamMembers(payload, mediaId, overwrite)
  await seedGalleryImages(payload, mediaId, overwrite)
  await seedTestimonials(payload, mediaId, overwrite)
}
