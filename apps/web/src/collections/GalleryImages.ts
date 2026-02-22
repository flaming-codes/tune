import type { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'isFeatured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Bild',
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
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Hervorgehoben',
      admin: {
        description: 'Hervorgehobene Bilder werden größer in der Galerie dargestellt',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktiv',
      admin: {
        description: 'Nur aktive Bilder werden in der Galerie angezeigt',
      },
    },
  ],
}
