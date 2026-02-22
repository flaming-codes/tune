import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Leistungen',
    plural: 'Leistungen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Leistungen',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Umfassende tierärztliche Betreuung für Ihren Liebling',
      label: 'Überschrift',
    },
    {
      name: 'groups',
      type: 'array',
      required: true,
      label: 'Leistungsgruppen',
      labels: {
        singular: 'Gruppe',
        plural: 'Gruppen',
      },
      defaultValue: [
        {
          category: 'Vorsorge',
          items: [
            { text: 'Labor-Check (hausinterne Diagnostik)' },
            { text: 'Schutzimpfungen' },
            { text: 'Parasitenprophylaxe' },
            { text: 'Vorsorge Untersuchungen' },
          ],
        },
        {
          category: 'Diagnostik',
          items: [
            { text: 'Hausinternes Blutlabor' },
            { text: 'Elektronische Tierkennzeichnung' },
            { text: 'Therapie chronischer und akuter Erkrankungen' },
          ],
        },
        {
          category: 'Operationen',
          items: [{ text: 'Weichteilchirurgie inkl. Sterilisation' }, { text: 'Zahnbehandlungen' }],
        },
        {
          category: 'Alternative Therapie',
          items: [
            { text: 'Chiropraktik' },
            { text: 'Lasertherapie' },
            { text: 'Schmerztherapie und alternative Schmerztherapie' },
          ],
        },
        {
          category: 'Beratung',
          items: [
            { text: 'Ernährungsberatung' },
            { text: 'Zoonoseerreger bzw. Leishmaniose' },
            { text: 'Therapie und Beratung' },
            { text: 'Hausapotheke' },
          ],
        },
      ],
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Kategorie',
        },
        {
          name: 'items',
          type: 'array',
          required: true,
          label: 'Einträge',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Text',
            },
          ],
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'Haben Sie Fragen zu unseren Leistungen?',
      label: 'CTA Text',
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Kontaktieren Sie uns',
      label: 'CTA Button Label',
    },
    {
      name: 'ctaButtonHref',
      type: 'text',
      required: true,
      defaultValue: '#kontakt',
      label: 'CTA Button Link',
    },
  ],
}
