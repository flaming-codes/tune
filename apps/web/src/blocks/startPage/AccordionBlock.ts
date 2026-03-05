import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Akkordeon',
    plural: 'Akkordeons',
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
      label: 'Beschreibung',
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Ausrichtung',
      defaultValue: 'start',
      options: [
        {
          label: 'Links (mit negativem Raum rechts)',
          value: 'start',
        },
        {
          label: 'Rechts (mit negativem Raum links)',
          value: 'end',
        },
        {
          label: 'Volle Breite',
          value: 'full',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Akkordeon-Einträge',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Frage',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Antwort',
        },
      ],
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      label: 'Mehrere Einträge gleichzeitig öffnen',
      defaultValue: false,
    },
  ],
}
