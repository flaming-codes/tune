import type { CollectionConfig, Field, Tab } from 'payload'

// Owner name fields (2 columns)
const ownerNameFields: Field[] = [
  {
    name: 'ownerLastName',
    type: 'text',
    required: true,
    label: 'Nachname',
    admin: {
      width: '50%',
    },
  },
  {
    name: 'ownerFirstName',
    type: 'text',
    required: true,
    label: 'Vorname',
    admin: {
      width: '50%',
    },
  },
]

// Computed full name field
const ownerFullNameField: Field = {
  name: 'ownerFullName',
  type: 'text',
  label: 'Name (vollständig)',
  admin: {
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        if (siblingData.ownerFirstName && siblingData.ownerLastName) {
          return `${siblingData.ownerFirstName} ${siblingData.ownerLastName}`
        }
        return undefined
      },
    ],
  },
}

// Owner contact fields (2 columns)
const ownerContactFields: Field[] = [
  {
    name: 'ownerTitle',
    type: 'text',
    label: 'Titel',
    admin: {
      width: '50%',
    },
  },
  {
    name: 'ownerDateOfBirth',
    type: 'date',
    label: 'Geburtsdatum',
    admin: {
      width: '50%',
      date: {
        pickerAppearance: 'dayOnly',
        displayFormat: 'dd.MM.yyyy',
      },
    },
  },
]

// Owner address fields
const ownerAddressFields: Field[] = [
  {
    name: 'ownerStreet',
    type: 'text',
    required: true,
    label: 'Straße/Hausnummer',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'ownerPostalCode',
        type: 'text',
        required: true,
        label: 'PLZ',
        admin: {
          width: '30%',
        },
      },
      {
        name: 'ownerCity',
        type: 'text',
        required: true,
        label: 'Ort',
        admin: {
          width: '70%',
        },
      },
    ],
  },
]

// Owner communication fields (2 columns)
const ownerCommunicationFields: Field[] = [
  {
    name: 'ownerPhone',
    type: 'text',
    required: true,
    label: 'Telefon/Mobil',
    admin: {
      width: '50%',
    },
  },
  {
    name: 'ownerEmail',
    type: 'email',
    label: 'E-Mail',
    admin: {
      width: '50%',
    },
  },
]

// Patient basic info fields
const patientBasicFields: Field[] = [
  {
    name: 'patientName',
    type: 'text',
    required: true,
    label: 'Patient Name',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'patientAnimalType',
        type: 'select',
        required: true,
        label: 'Tierart',
        options: [
          { label: 'Hund', value: 'dog' },
          { label: 'Katze', value: 'cat' },
          { label: 'Andere', value: 'other' },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'patientGender',
        type: 'select',
        label: 'Geschlecht',
        options: [
          { label: 'Männlich', value: 'male' },
          { label: 'Weiblich', value: 'female' },
          { label: 'Kastriert', value: 'neutered' },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
]

// Patient details fields (collapsible)
const patientDetailsFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Zusätzliche Patienteninformationen',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'patientBreed',
            type: 'text',
            label: 'Rasse',
            admin: {
              width: '50%',
            },
          },
          {
            name: 'patientColor',
            type: 'text',
            label: 'Farbe',
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'patientDateOfBirth',
            type: 'date',
            label: 'Geburtsdatum (Patient)',
            admin: {
              width: '50%',
              date: {
                pickerAppearance: 'dayOnly',
                displayFormat: 'dd.MM.yyyy',
              },
            },
          },
          {
            name: 'patientWeight',
            type: 'text',
            label: 'Gewicht',
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        name: 'patientSpecialNotes',
        type: 'textarea',
        label: 'Besondere Hinweise',
        admin: {
          description: 'Allergien, Unverträglichkeiten, Verhaltensauffälligkeiten, usw.',
        },
      },
    ],
  },
]

// Consent and signature fields
const consentFields: Field[] = [
  {
    name: 'signedAt',
    type: 'date',
    required: true,
    label: 'Unterschrieben am',
    defaultValue: () => new Date().toISOString(),
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
        displayFormat: 'dd.MM.yyyy HH:mm',
      },
    },
  },
  {
    name: 'signatureDataUrl',
    type: 'text',
    required: true,
    label: 'Unterschrift',
    admin: {
      description: 'Die digitale Unterschrift als Base64 Data URL',
      components: {
        afterInput: ['/admin/components/SignaturePreviewAfterInput#SignaturePreviewAfterInput'],
      },
    },
  },
]

// Audit trail fields (sidebar)
const auditFields: Field[] = [
  {
    name: 'clientIp',
    type: 'text',
    label: 'IP-Adresse',
    admin: {
      description: 'Zur Audit-Trail (optional)',
      position: 'sidebar',
    },
  },
  {
    name: 'userAgent',
    type: 'text',
    label: 'User-Agent',
    admin: {
      description: 'Browser-Information (optional)',
      position: 'sidebar',
    },
  },
]

// Tabs configuration
const tabs: Tab[] = [
  {
    label: 'Besitzer',
    fields: [
      ...ownerNameFields,
      ownerFullNameField,
      ...ownerContactFields,
      ...ownerAddressFields,
      ...ownerCommunicationFields,
    ],
  },
  {
    label: 'Patient',
    fields: [...patientBasicFields, ...patientDetailsFields],
  },
  {
    label: 'Einverständnis',
    fields: consentFields,
  },
]

export const PrivacyAcknowledgments: CollectionConfig = {
  slug: 'privacy-acknowledgments',
  admin: {
    useAsTitle: 'ownerFullName',
    defaultColumns: ['ownerFullName', 'patientName', 'signedAt', 'createdAt'],
    description:
      'Datenschutzerklärungen von Patientenbesitzern. Hier werden alle digital unterschriebenen Einverständniserklärungen gespeichert.',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'tabs',
      tabs,
    },
    ...auditFields,
  ],
  timestamps: true,
}
