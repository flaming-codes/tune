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
      label: 'Tagline',
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      label: 'Copyright Text',
    },
  ],
}
