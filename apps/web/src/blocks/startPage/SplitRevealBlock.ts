import type { Block } from 'payload'

export const SplitRevealBlock: Block = {
  slug: 'splitReveal',
  labels: {
    singular: 'Geteilte Enthüllung',
    plural: 'Geteilte Enthüllungen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Unsere Werte',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Was uns antreibt',
      label: 'Überschrift',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      label: 'Einträge',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
      },
      defaultValue: [
        {
          title: 'Sanftmut',
          description:
            'Wir behandeln jedes Tier mit Einfühlungsvermögen und Geduld — denn Vertrauen ist die Grundlage jeder guten Behandlung.',
        },
        {
          title: 'Transparenz',
          description:
            'Offene Kommunikation über Diagnose, Behandlung und Kosten. Sie sind immer Teil der Entscheidung.',
        },
        {
          title: 'Expertise',
          description:
            'Modernste Methoden und kontinuierliche Weiterbildung — damit Ihr Tier die bestmögliche Versorgung erhält.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Beschreibung',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Bild',
          admin: {
            description: 'Das Bild, das beim Scrollen zu diesem Eintrag eingeblendet wird',
          },
        },
      ],
    },
  ],
}
