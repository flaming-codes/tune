import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'googleReviewUrl',
      type: 'text',
      required: true,
      label: 'Google Bewertungs-URL',
    },
    {
      name: 'reviewCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Anzahl der Bewertungen',
    },
    {
      name: 'averageRating',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 0,
      max: 5,
      label: 'Durchschnittliche Bewertung',
      admin: {
        step: 0.1,
      },
    },
  ],
}
