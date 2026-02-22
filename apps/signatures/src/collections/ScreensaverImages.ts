import type { CollectionConfig } from 'payload'

export const ScreensaverImages: CollectionConfig = {
  slug: 'screensaver-images',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'updatedAt'],
    description: 'Bilder für den Bildschirmschoner im Wartebereich.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    staticDir: 'screensaver-images',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
      },
      {
        name: 'fullscreen',
        width: 1920,
        height: 1080,
        fit: 'cover',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktiv',
      defaultValue: true,
      admin: {
        description: 'Nur aktive Bilder werden im Bildschirmschoner angezeigt.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Anzeigereihenfolge',
      admin: {
        description: 'Höhere Zahlen werden später angezeigt (aufsteigend sortiert).',
      },
    },
  ],
  timestamps: true,
}
