import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team',
    plural: 'Team',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Über uns',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Unser Team',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      defaultValue: 'Mit Leidenschaft für Ihre Lieblinge',
      label: 'Beschreibung',
    },
  ],
}
