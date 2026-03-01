import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Leistungen',
    plural: 'Leistungen',
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
      name: 'groups',
      type: 'array',
      required: true,
      label: 'Leistungsgruppen',
      labels: {
        singular: 'Gruppe',
        plural: 'Gruppen',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Kategorie',
        },
        {
          name: 'items',
          type: 'array',
          required: true,
          label: 'Einträge',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Text',
            },
          ],
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'CTA Text',
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      required: true,
      label: 'CTA Button Label',
    },
    {
      name: 'ctaButtonHref',
      type: 'text',
      required: true,
      label: 'CTA Button Link',
    },
  ],
}
