import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',
  labels: {
    singular: 'Footer',
    plural: 'Footer',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.',
      label: 'Tagline',
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: 'Mit Leidenschaft für Ihre Lieblinge.',
      label: 'Copyright Text',
    },
  ],
}
