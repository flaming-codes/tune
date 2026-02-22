import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Kontakt',
    plural: 'Kontakt',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Kontakt',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Wir freuen uns auf Sie',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.',
      label: 'Beschreibung',
    },
    {
      name: 'address',
      type: 'group',
      label: 'Adresse',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          defaultValue: 'Brünnerstraße 219-221',
          label: 'Straße',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          defaultValue: '1210 Wien',
          label: 'Stadt',
        },
        {
          name: 'additional',
          type: 'text',
          defaultValue: '1 TOP 60 (Einkaufszentrum B7)',
          label: 'Zusatz',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+43 699 190 12 012',
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'contact@tierarztpraxis-lazri.at',
      label: 'E-Mail',
    },
    {
      name: 'consultationTimes',
      type: 'textarea',
      required: true,
      defaultValue: 'Mo–Fr: 09:00 – 12:00\nNachmittags nach Vereinbarung',
      label: 'Sprechzeiten',
    },
    {
      name: 'directionsDescription',
      type: 'textarea',
      required: true,
      defaultValue:
        'Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.',
      label: 'Anfahrt Beschreibung',
    },
    {
      name: 'directionsLinkLabel',
      type: 'text',
      required: true,
      defaultValue: 'In Google Maps öffnen',
      label: 'Anfahrt Link Label',
    },
  ],
}
