import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galerie',
    plural: 'Galerie',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Galerie',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Das sind unsere tierischen Patienten',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.',
      label: 'Beschreibung',
    },
    {
      name: 'emptyStateText',
      type: 'text',
      required: true,
      defaultValue: 'Noch keine Bilder in der Galerie.',
      label: 'Leerer Zustand Text',
    },
  ],
}
