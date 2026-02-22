import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: [
      'author',
      'rating',
      'statementTimestamp',
      'sortOrder',
      'isActive',
      'updatedAt',
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Testimonial Text',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Avatar Bild',
      admin: {
        description: 'Profilbild des Bewertenden',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 0,
      max: 5,
      label: 'Bewertung',
      admin: {
        description: 'Bewertung von 0 bis 5 Sternen (Dezimalzahlen erlaubt, z.B. 4.5)',
        step: 0.1,
      },
    },
    {
      name: 'statementTimestamp',
      type: 'date',
      required: true,
      label: 'Zeitpunkt der Aussage',
      admin: {
        description:
          'Zeitstempel, wann die Aussage gemacht wurde (nicht das Erstellungsdatum des Eintrags)',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd.M.yyyy HH:mm',
        },
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Sortierreihenfolge',
      admin: {
        description: 'Niedrigere Zahlen werden zuerst angezeigt',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktiv',
      admin: {
        description: 'Nur aktive Testimonials werden auf der Website angezeigt',
      },
    },
  ],
}
