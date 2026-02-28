import type { Block } from 'payload'

export const MarqueeTextBlock: Block = {
  slug: 'marqueeText',
  labels: {
    singular: 'Lauftext',
    plural: 'Lauftexte',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      defaultValue: 'Ihre Tiere in besten Händen',
      label: 'Text',
      admin: {
        description: 'Der Text, der wiederholt über die Seite läuft',
      },
    },
    {
      name: 'separator',
      type: 'select',
      label: 'Trennzeichen',
      defaultValue: 'dot',
      options: [
        { label: 'Punkt', value: 'dot' },
        { label: 'Raute', value: 'diamond' },
        { label: 'Pfote', value: 'paw' },
        { label: 'Keines', value: 'none' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: 'Stil',
      defaultValue: 'filled',
      options: [
        { label: 'Ausgefüllt', value: 'filled' },
        { label: 'Kontur', value: 'outlined' },
        { label: 'Abwechselnd', value: 'alternating' },
      ],
    },
    {
      name: 'speed',
      type: 'select',
      label: 'Geschwindigkeit',
      defaultValue: 'normal',
      options: [
        { label: 'Langsam', value: 'slow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Schnell', value: 'fast' },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      label: 'Richtung',
      defaultValue: 'left',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
    },
  ],
}
