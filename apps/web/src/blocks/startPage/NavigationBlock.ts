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
      defaultValue: 'Tierarztpraxis Dr. Tune Lazri',
      label: 'Praxisname',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+43 699 190 12 012',
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
      defaultValue: [
        { label: 'Home', href: '#home' },
        { label: 'Leistungen', href: '#leistungen' },
        { label: 'Über uns', href: '#team' },
        { label: 'Kontakt', href: '#kontakt' },
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutzerklärung', href: '/datenschutzerklarung' },
      ],
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
