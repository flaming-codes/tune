import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'reviewDate', 'sortOrder', 'isActive', 'updatedAt'],
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar Bild',
      admin: {
        description: 'Profilbild des Autors',
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
      name: 'reviewDate',
      type: 'date',
      required: true,
      defaultValue: new Date().toISOString(),
      label: 'Bewertungsdatum',
      admin: {
        description: 'Datum, an dem die Bewertung abgegeben wurde (nicht das Erstellungsdatum des Eintrags)',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd.M.yyyy',
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
