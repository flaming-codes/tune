import type { Block } from 'payload'

export const HoursBlock: Block = {
  slug: 'hours',
  labels: {
    singular: 'Öffnungszeiten',
    plural: 'Öffnungszeiten',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Öffnungszeiten',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Wann wir für Sie da sind',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Flexible Öffnungszeiten für Sie und Ihre Lieblinge. Auch Hausbesuche sind nach Vereinbarung möglich.',
      label: 'Beschreibung',
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
  ],
}
