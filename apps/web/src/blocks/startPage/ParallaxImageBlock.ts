import type { Block } from 'payload'

export const ParallaxImageBlock: Block = {
  slug: 'parallaxImage',
  labels: {
    singular: 'Parallax-Bild',
    plural: 'Parallax-Bilder',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Bild',
      admin: {
        description: 'Vollflächiges Bild mit Parallax-Effekt',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Optionaler Text über dem Bild',
      },
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Untertext',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay-Deckkraft',
      defaultValue: 40,
      min: 0,
      max: 100,
      admin: {
        description: 'Wie dunkel der Verlauf über dem Bild ist (0 = transparent, 100 = schwarz)',
        step: 5,
      },
    },
    {
      name: 'height',
      type: 'select',
      label: 'Höhe',
      defaultValue: 'tall',
      options: [
        { label: 'Mittel (60vh)', value: 'medium' },
        { label: 'Groß (80vh)', value: 'tall' },
        { label: 'Vollbild (100vh)', value: 'fullscreen' },
      ],
    },
  ],
}
