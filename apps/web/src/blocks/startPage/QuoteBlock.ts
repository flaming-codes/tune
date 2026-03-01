import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Zitat',
    plural: 'Zitat',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Zitat Text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
      label: 'Autor',
      admin: {
        description: 'Wählen Sie ein Teammitglied als Autor des Zitats aus',
      },
    },
  ],
}
