import type { Block } from 'payload'

export const StackingCardsBlock: Block = {
  slug: 'stackingCards',
  labels: {
    singular: 'Stapelkarten',
    plural: 'Stapelkarten',
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
      label: 'Beschreibung',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 8,
      label: 'Schritte',
      labels: {
        singular: 'Schritt',
        plural: 'Schritte',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Beschreibung',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: {
            description: 'Optionales Icon oder Illustration für diesen Schritt',
          },
        },
      ],
    },
  ],
}
