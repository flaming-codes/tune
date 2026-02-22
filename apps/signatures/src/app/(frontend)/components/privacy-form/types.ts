export interface PrivacyFormData {
  ownerLastName: string
  ownerFirstName: string
  ownerTitle: string
  ownerDateOfBirth: string
  ownerStreet: string
  ownerPostalCode: string
  ownerCity: string
  ownerPhone: string
  ownerEmail: string

  patientName: string
  patientAnimalType: 'dog' | 'cat' | 'other' | ''
  patientBreed: string
  patientColor: string
  patientGender: 'male' | 'female' | 'neutered' | ''
  patientDateOfBirth: string
  patientWeight: string
  patientSpecialNotes: string

  signatureDataUrl: string
}

export type UpdatePrivacyField = <K extends keyof PrivacyFormData>(
  field: K,
  value: PrivacyFormData[K],
) => void

export type IsPrivacyFieldInvalid = (field: keyof PrivacyFormData) => boolean

export const initialFormData: PrivacyFormData = {
  ownerLastName: '',
  ownerFirstName: '',
  ownerTitle: '',
  ownerDateOfBirth: '',
  ownerStreet: '',
  ownerPostalCode: '',
  ownerCity: '',
  ownerPhone: '',
  ownerEmail: '',

  patientName: '',
  patientAnimalType: '',
  patientBreed: '',
  patientColor: '',
  patientGender: '',
  patientDateOfBirth: '',
  patientWeight: '',
  patientSpecialNotes: '',

  signatureDataUrl: '',
}

export const privacyFormSteps = [
  { id: 1, label: 'Besitzer', shortLabel: '01' },
  { id: 2, label: 'Patient', shortLabel: '02' },
  { id: 3, label: 'Einverständnis', shortLabel: '03' },
]
