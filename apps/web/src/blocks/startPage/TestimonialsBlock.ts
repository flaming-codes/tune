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
      defaultValue: 'Erfahrungen',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Was die Lieblingsmenschen unserer Fellnasen über uns sagen',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!',
      label: 'Beschreibung',
    },
    {
      name: 'googleReviewUrl',
      type: 'text',
      required: true,
      defaultValue:
        'https://search.google.com/local/writereview?placeid=ChIJ7aw4mO8FbUcRmAeyWnxejUs',
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
