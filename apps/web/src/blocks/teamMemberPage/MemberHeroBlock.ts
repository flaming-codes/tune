import type { Block } from 'payload'

export const MemberHeroBlock: Block = {
  slug: 'memberHero',
  labels: {
    singular: 'Member Hero',
    plural: 'Member Hero',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'editorial',
      label: 'Layout Variante',
      options: [
        {
          label: 'Editorial (Bild dominant, überlappend)',
          value: 'editorial',
        },
        {
          label: 'Immersive (Vollbild, widescreen)',
          value: 'immersive',
        },
        {
          label: 'Minimal (Text zentriert, kleines Bild)',
          value: 'minimal',
        },
      ],
      admin: {
        description: 'Wählen Sie das Layout für den Hero-Bereich',
      },
    },
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
      name: 'subheadline',
      type: 'text',
      required: true,
      label: 'Unterüberschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Cover Bild',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      label: 'CTA Text',
    },
    {
      name: 'ctaHref',
      type: 'text',
      required: true,
      label: 'CTA Link',
    },
  ],
}
