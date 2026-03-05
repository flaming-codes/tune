import type { Block } from 'payload'

export const MemberSentenceListBlock: Block = {
  slug: 'memberSentenceList',
  labels: {
    singular: 'Satz mit Liste',
    plural: 'Sätze mit Listen',
  },
  fields: [
    {
      name: 'sentenceStart',
      type: 'text',
      required: true,
      label: 'Satzbeginn',
      admin: {
        description:
          'Kurzer Satzbeginn (max. 60 Zeichen). Für beste Wirkung als einzeiligen Satz formulieren.',
      },
      validate: (value: string | null | undefined) => {
        if (value && value.length > 60) {
          return `Bitte maximal 60 Zeichen verwenden (aktuell: ${value.length})`
        }
        return true
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Listeneinträge',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
      },
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
}
