import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galerie',
    plural: 'Galerie',
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
      name: 'emptyStateText',
      type: 'text',
      required: true,
      label: 'Leerer Zustand Text',
    },
  ],
}
