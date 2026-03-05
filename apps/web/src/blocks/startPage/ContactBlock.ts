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
      name: 'address',
      type: 'group',
      label: 'Adresse',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          label: 'Straße',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Stadt',
        },
        {
          name: 'additional',
          type: 'text',
          label: 'Zusatz',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-Mail',
    },
    {
      name: 'consultationTimes',
      type: 'textarea',
      required: true,
      label: 'Sprechzeiten',
    },
    {
      name: 'directionsDescription',
      type: 'textarea',
      required: true,
      label: 'Anfahrt Beschreibung',
    },
    {
      name: 'directionsLinkLabel',
      type: 'text',
      required: true,
      label: 'Anfahrt Link Label',
    },
  ],
}
