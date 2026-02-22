import type { CollectionConfig } from 'payload'

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
    // Patient Owner Information
    {
      name: 'ownerLastName',
      type: 'text',
      required: true,
      label: 'Nachname',
    },
    {
      name: 'ownerFirstName',
      type: 'text',
      required: true,
      label: 'Vorname',
    },
    {
      name: 'ownerFullName',
      type: 'text',
      label: 'Name (vollständig)',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // This will be set from the form, but if not, compute it
            if (siblingData.ownerFirstName && siblingData.ownerLastName) {
              return `${siblingData.ownerFirstName} ${siblingData.ownerLastName}`
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'ownerTitle',
      type: 'text',
      label: 'Titel',
    },
    {
      name: 'ownerDateOfBirth',
      type: 'date',
      label: 'Geburtsdatum',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'ownerStreet',
      type: 'text',
      required: true,
      label: 'Straße/Hausnummer',
    },
    {
      name: 'ownerPostalCode',
      type: 'text',
      required: true,
      label: 'PLZ',
    },
    {
      name: 'ownerCity',
      type: 'text',
      required: true,
      label: 'Ort',
    },
    {
      name: 'ownerPhone',
      type: 'text',
      required: true,
      label: 'Telefon/Mobil',
    },
    {
      name: 'ownerEmail',
      type: 'email',
      label: 'E-Mail',
    },

    // Patient Information
    {
      name: 'patientName',
      type: 'text',
      required: true,
      label: 'Patient Name',
    },
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
    },
    {
      name: 'patientBreed',
      type: 'text',
      label: 'Rasse',
    },
    {
      name: 'patientColor',
      type: 'text',
      label: 'Farbe',
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
    },
    {
      name: 'patientDateOfBirth',
      type: 'date',
      label: 'Geburtsdatum (Patient)',
      admin: {
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
    },
    {
      name: 'patientSpecialNotes',
      type: 'textarea',
      label: 'Besondere Hinweise',
      admin: {
        description: 'Allergien, Unverträglichkeiten, Verhaltensauffälligkeiten, usw.',
      },
    },

    // Consent & Signature
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
      label: 'Unterschrift (Base64)',
      admin: {
        description: 'Die digitale Unterschrift als Base64 Data URL',
        components: {
          afterInput: ['/admin/components/SignaturePreviewAfterInput#SignaturePreviewAfterInput'],
        },
      },
    },
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
  ],
  timestamps: true,
}
