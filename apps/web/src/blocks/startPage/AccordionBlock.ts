import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Akkordeon',
    plural: 'Akkordeons',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'FAQ',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Häufig gestellte Fragen',
      label: 'Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Ausrichtung',
      defaultValue: 'start',
      options: [
        {
          label: 'Links (mit negativem Raum rechts)',
          value: 'start',
        },
        {
          label: 'Rechts (mit negativem Raum links)',
          value: 'end',
        },
        {
          label: 'Volle Breite',
          value: 'full',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Akkordeon-Einträge',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
      },
      defaultValue: [
        {
          question: 'Welche Tiere behandeln Sie?',
          answer:
            'Ich behandle Kleintiere wie Hunde, Katzen, Kaninchen, Meerschweinchen, Hamster und andere Heimtiere.',
        },
        {
          question: 'Muss ich einen Termin vereinbaren?',
          answer:
            'Ja, bitte vereinbaren Sie vorab einen Termin, damit ich mich ausreichend Zeit für Sie und Ihr Tier nehmen kann.',
        },
        {
          question: 'Bieten Sie auch Hausbesuche an?',
          answer:
            'Ja, auf Wunsch besuche ich Sie und Ihren Liebling gerne zu Hause. Dies ist besonders für ängstliche Tiere oder bei Mobilitätseinschränkungen sinnvoll.',
        },
      ],
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Frage',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Antwort',
        },
      ],
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      label: 'Mehrere Einträge gleichzeitig öffnen',
      defaultValue: false,
    },
  ],
}
