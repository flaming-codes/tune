import type { Block } from 'payload'

export const EditorialRevealBlock: Block = {
  slug: 'editorialReveal',
  labels: {
    singular: 'Redaktionelle Enthüllung',
    plural: 'Redaktionelle Enthüllungen',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Text',
      admin: {
        description:
          'Der Text wird zeilenweise beim Scrollen eingeblendet. Jede Zeile wird einzeln animiert.',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Autorname',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Rolle des Autors',
    },
    {
      name: 'authorPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Autorfoto',
      admin: {
        description: 'Kleines Porträt des Autors',
      },
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Ausrichtung',
      defaultValue: 'center',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Zentriert', value: 'center' },
      ],
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      label: 'Trennlinie anzeigen',
      defaultValue: true,
      admin: {
        description: 'Animierte horizontale Linie unter dem Text',
      },
    },
  ],
}
