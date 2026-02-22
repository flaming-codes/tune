import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Kontaktformular',
    plural: 'Kontaktformular',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Anfrage',
      label: 'Eyebrow Text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Schreiben Sie uns',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.',
      label: 'Beschreibung',
    },
  ],
}
