import type { Block } from 'payload'

export const HoursBlock: Block = {
  slug: 'hours',
  labels: {
    singular: 'Öffnungszeiten',
    plural: 'Öffnungszeiten',
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
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Öffnungszeiten',
      minRows: 7,
      maxRows: 7,
      labels: {
        singular: 'Tag',
        plural: 'Tage',
      },
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Wochentag',
        },
        {
          name: 'state',
          type: 'select',
          required: true,
          label: 'Status',
          defaultValue: 'open',
          options: [
            { label: 'Geöffnet', value: 'open' },
            { label: 'Nur nach Vereinbarung', value: 'reservation' },
            { label: 'Geschlossen', value: 'closed' },
          ],
        },
        {
          name: 'times',
          type: 'text',
          required: true,
          label: 'Öffnungszeiten',
        },
      ],
    },
    {
      name: 'emergency',
      type: 'group',
      label: 'Notfallhinweis',
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
      ],
    },
  ],
}
