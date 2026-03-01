import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Überschrift',
    },
    {
      name: 'subheadline',
      type: 'text',
      required: true,
      label: 'Unterüberschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Bild',
    },
    {
      name: 'ctaPrimaryText',
      type: 'text',
      required: true,
      label: 'Primärer Button Text',
    },
    {
      name: 'ctaPrimaryHref',
      type: 'text',
      required: true,
      label: 'Primärer Button Link',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      required: true,
      label: 'Sekundärer Button Text',
    },
    {
      name: 'ctaSecondaryHref',
      type: 'text',
      required: true,
      label: 'Sekundärer Button Link',
    },
  ],
}
