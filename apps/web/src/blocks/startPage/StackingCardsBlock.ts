import type { Block } from 'payload'

export const StackingCardsBlock: Block = {
  slug: 'stackingCards',
  labels: {
    singular: 'Stapelkarten',
    plural: 'Stapelkarten',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Ihr Besuch',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Schritt für Schritt bestens betreut',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 8,
      label: 'Schritte',
      labels: {
        singular: 'Schritt',
        plural: 'Schritte',
      },
      defaultValue: [
        {
          title: 'Terminvereinbarung',
          description:
            'Rufen Sie uns an oder nutzen Sie unser Kontaktformular, um einen passenden Termin zu finden.',
        },
        {
          title: 'Erstgespräch',
          description:
            'Wir nehmen uns Zeit für Sie und Ihr Tier — erzählen Sie uns von Ihrem Liebling.',
        },
        {
          title: 'Untersuchung',
          description:
            'Gründliche Diagnostik mit modernster Ausstattung für eine präzise Einschätzung.',
        },
        {
          title: 'Behandlungsplan',
          description:
            'Transparente Besprechung aller Optionen — gemeinsam entscheiden wir den besten Weg.',
        },
      ],
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
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: {
            description: 'Optionales Icon oder Illustration für diesen Schritt',
          },
        },
      ],
    },
  ],
}
