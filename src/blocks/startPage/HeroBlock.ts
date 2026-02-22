import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Dr. Tune Lazri',
      label: 'Überschrift',
    },
    {
      name: 'subheadline',
      type: 'text',
      required: true,
      defaultValue: 'Tierarztpraxis',
      label: 'Unterüberschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.',
      label: 'Beschreibung',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Bild',
    },
    {
      name: 'ctaPrimaryText',
      type: 'text',
      required: true,
      defaultValue: 'Termin vereinbaren',
      label: 'Primärer Button Text',
    },
    {
      name: 'ctaPrimaryHref',
      type: 'text',
      required: true,
      defaultValue: '#kontakt',
      label: 'Primärer Button Link',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      required: true,
      defaultValue: 'Leistungen',
      label: 'Sekundärer Button Text',
    },
    {
      name: 'ctaSecondaryHref',
      type: 'text',
      required: true,
      defaultValue: '#leistungen',
      label: 'Sekundärer Button Link',
    },
  ],
}
