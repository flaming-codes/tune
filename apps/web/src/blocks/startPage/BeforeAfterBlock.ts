import type { Block } from 'payload'

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: {
    singular: 'Vorher/Nachher',
    plural: 'Vorher/Nachher',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'pairs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      label: 'Vergleiche',
      labels: {
        singular: 'Vergleich',
        plural: 'Vergleiche',
      },
      fields: [
        {
          name: 'beforeImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Vorher-Bild',
        },
        {
          name: 'afterImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Nachher-Bild',
        },
        {
          name: 'beforeLabel',
          type: 'text',
          defaultValue: 'Vorher',
          label: 'Vorher-Beschriftung',
        },
        {
          name: 'afterLabel',
          type: 'text',
          defaultValue: 'Nachher',
          label: 'Nachher-Beschriftung',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Bildunterschrift',
        },
      ],
    },
  ],
}
