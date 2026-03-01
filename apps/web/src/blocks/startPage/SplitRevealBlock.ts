import type { Block } from 'payload'

export const SplitRevealBlock: Block = {
  slug: 'splitReveal',
  labels: {
    singular: 'Geteilte Enthüllung',
    plural: 'Geteilte Enthüllungen',
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
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      label: 'Einträge',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Bild',
          admin: {
            description: 'Das Bild, das beim Scrollen zu diesem Eintrag eingeblendet wird',
          },
        },
      ],
    },
  ],
}
