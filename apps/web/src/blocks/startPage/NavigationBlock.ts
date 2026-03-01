import type { Block } from 'payload'

export const NavigationBlock: Block = {
  slug: 'navigation',
  labels: {
    singular: 'Navigation',
    plural: 'Navigation',
  },
  fields: [
    {
      name: 'practiceName',
      type: 'text',
      required: true,
      label: 'Praxisname',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'URL / Anker',
        },
      ],
    },
  ],
}
