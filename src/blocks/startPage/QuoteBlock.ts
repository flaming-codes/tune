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
      defaultValue:
        'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.',
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
