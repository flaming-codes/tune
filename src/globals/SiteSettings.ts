import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website Einstellungen',
  admin: {
    group: 'Einstellungen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'practiceName',
      type: 'text',
      required: true,
      defaultValue: 'Tierarztpraxis Dr. Tune Lazri',
      label: 'Praxisname',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Bereich',
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
          name: 'ctaPrimary',
          type: 'text',
          required: true,
          defaultValue: 'Termin vereinbaren',
          label: 'Primärer Button Text',
        },
        {
          name: 'ctaSecondary',
          type: 'text',
          required: true,
          defaultValue: 'Leistungen',
          label: 'Sekundärer Button Text',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontakt',
      fields: [
        {
          name: 'address',
          type: 'group',
          label: 'Adresse',
          fields: [
            {
              name: 'street',
              type: 'text',
              required: true,
              defaultValue: 'Brünnerstraße 219-221',
            },
            {
              name: 'city',
              type: 'text',
              required: true,
              defaultValue: '1210 Wien',
            },
            {
              name: 'additional',
              type: 'text',
              defaultValue: '1 TOP 60 (Einkaufszentrum B7)',
              label: 'Zusatz',
            },
          ],
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+43 699 190 12 012',
          label: 'Telefon',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'contact@tierarztpraxis-lazri.at',
          label: 'E-Mail',
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Öffnungszeiten',
      minRows: 7,
      maxRows: 7,
      labels: {
        singular: 'Tag',
        plural: 'Tage',
      },
      defaultValue: [
        { day: 'Montag', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Dienstag', times: '08:30 – 12:00 und 17:00 – 19:00' },
        { day: 'Mittwoch', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Donnerstag', times: '08:30 – 12:30 und 17:00 – 19:00' },
        { day: 'Freitag', times: '09:00 – 12:00 und 17:00 – 19:00' },
        { day: 'Samstag', times: 'Nach Vereinbarung' },
        { day: 'Sonntag', times: 'Geschlossen' },
      ],
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Wochentag',
        },
        {
          name: 'times',
          type: 'text',
          required: true,
          label: 'Öffnungszeiten',
        },
      ],
    },
    {
      name: 'emergency',
      type: 'group',
      label: 'Notfallhinweis',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Notfälle außerhalb der Öffnungszeiten',
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      defaultValue: [
        { label: 'Home', href: '#home' },
        { label: 'Leistungen', href: '#leistungen' },
        { label: 'Über uns', href: '#team' },
        { label: 'Kontakt', href: '#kontakt' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'URL / Anker',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          required: true,
          defaultValue: 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.',
          label: 'Tagline',
        },
        {
          name: 'copyright',
          type: 'text',
          required: true,
          defaultValue: 'Mit Leidenschaft für Ihre Lieblinge.',
          label: 'Copyright Text',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Tierarztpraxis Dr. Tune Lazri | Wien',
          label: 'Seitentitel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen. Mit Leidenschaft für Ihre Lieblinge.',
          label: 'Meta Beschreibung',
        },
      ],
    },
  ],
}
