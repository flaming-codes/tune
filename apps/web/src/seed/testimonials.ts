import type { Payload } from 'payload'

const testimonialsData = [
  {
    text: 'Frau Dr. Lazri hat sich wunderbar um unseren Hund gekümmert. Sehr einfühlsam und kompetent. Wir kommen gerne wieder!',
    author: 'Sandra M.',
    rating: 5,
    statementTimestamp: '2024-06-15T10:00:00.000Z',
    sortOrder: 0,
    isActive: true,
  },
  {
    text: 'Endlich eine Tierärztin, die sich Zeit nimmt und alles verständlich erklärt. Unsere Katze war in besten Händen.',
    author: 'Thomas K.',
    rating: 5,
    statementTimestamp: '2024-08-22T14:30:00.000Z',
    sortOrder: 1,
    isActive: true,
  },
  {
    text: 'Sehr freundliches Team und moderne Praxis. Die Hausbesuche sind für unseren älteren Hund eine echte Erleichterung.',
    author: 'Elisabeth R.',
    rating: 4.5,
    statementTimestamp: '2024-11-03T09:15:00.000Z',
    sortOrder: 2,
    isActive: true,
  },
]

export async function seedTestimonials(
  payload: Payload,
  mediaId: number,
  overwrite = false,
): Promise<void> {
  const existing = await payload.find({
    collection: 'testimonials',
    limit: 1,
  })

  if (existing.docs.length > 0 && !overwrite) {
    return
  }

  if (overwrite) {
    const all = await payload.find({ collection: 'testimonials', limit: 100 })
    for (const doc of all.docs) {
      await payload.delete({ collection: 'testimonials', id: doc.id })
    }
  }

  for (const testimonial of testimonialsData) {
    await payload.create({
      collection: 'testimonials',
      data: {
        ...testimonial,
        avatar: mediaId,
      },
    })
  }
}
