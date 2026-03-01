import type { Block } from 'payload'

export const MemberCvBlock: Block = {
  slug: 'memberCv',
  labels: {
    singular: 'Member CV',
    plural: 'Member CV',
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
      name: 'entries',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Einträge',
      fields: [
        {
          name: 'period',
          type: 'text',
          required: true,
          label: 'Zeitraum',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'institution',
          type: 'text',
          required: false,
          label: 'Institution',
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          label: 'Beschreibung',
        },
      ],
    },
  ],
}
