import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Zeitleiste',
    plural: 'Zeitleisten',
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
      name: 'events',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 12,
      label: 'Ereignisse',
      labels: {
        singular: 'Ereignis',
        plural: 'Ereignisse',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          label: 'Jahr',
          admin: {
            description: 'Jahr oder Zeitraum (z.B. "2008", "2020–2022")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
          admin: {
            description: 'Optionales Bild zu diesem Ereignis',
          },
        },
      ],
    },
  ],
}
