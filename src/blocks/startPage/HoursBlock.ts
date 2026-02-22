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
        { day: 'Montag', state: 'open', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Dienstag', state: 'open', times: '08:30 – 12:00 und 17:00 – 19:00' },
        { day: 'Mittwoch', state: 'open', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Donnerstag', state: 'open', times: '08:30 – 12:30 und 17:00 – 19:00' },
        { day: 'Freitag', state: 'open', times: '09:00 – 12:00 und 17:00 – 19:00' },
        { day: 'Samstag', state: 'reservation', times: 'Nach Vereinbarung' },
        { day: 'Sonntag', state: 'closed', times: 'Geschlossen' },
      ],
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Wochentag',
        },
        {
          name: 'state',
          type: 'select',
          required: true,
          label: 'Status',
          defaultValue: 'open',
          options: [
            { label: 'Geöffnet', value: 'open' },
            { label: 'Nur nach Vereinbarung', value: 'reservation' },
            { label: 'Geschlossen', value: 'closed' },
          ],
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
