import type { Block } from 'payload'

export const MetricsBlock: Block = {
  slug: 'metrics',
  labels: {
    singular: 'Kennzahlen',
    plural: 'Kennzahlen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      label: 'Kennzahlen',
      labels: {
        singular: 'Kennzahl',
        plural: 'Kennzahlen',
      },
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Wert',
          admin: {
            description: 'Die Zielzahl, zu der hochgezählt wird',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Text nach der Zahl (z.B. "+", "%", "★")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Bezeichnung',
          admin: {
            description: 'Was die Zahl bedeutet',
          },
        },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Darstellung',
      defaultValue: 'light',
      options: [
        {
          label: 'Hell',
          value: 'light',
        },
        {
          label: 'Dunkel',
          value: 'dark',
        },
      ],
    },
  ],
}
