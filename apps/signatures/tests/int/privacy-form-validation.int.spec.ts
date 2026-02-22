import { describe, expect, it } from 'vitest'
import { initialFormData } from '@/app/(frontend)/components/privacy-form/types'
import {
  validatePrivacyForm,
  validatePrivacyStep,
} from '@/app/(frontend)/components/privacy-form/validation'

describe('privacy form validation', () => {
  const baseStepOneData = {
    ownerLastName: 'Mustermann',
    ownerFirstName: 'Max',
    ownerStreet: 'Musterstraße 1',
    ownerPostalCode: '1010',
    ownerCity: 'Wien',
    ownerPhone: '+43 660 1234567',
    ownerEmail: 'max@example.com',
    ownerDateOfBirth: '1990-01-01',
  }

  const baseStepTwoData = {
    patientName: 'Bello',
    patientAnimalType: 'dog' as const,
    patientBreed: 'Labrador',
    patientColor: 'Schwarz',
    patientGender: 'male' as const,
    patientDateOfBirth: '2020-04-01',
    patientWeight: '12.5',
    patientSpecialNotes: 'Keine',
  }

  it('blocks step 1 advance on invalid email', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ...baseStepOneData,
        ownerEmail: 'invalid-email',
      },
      1,
    )

    expect(errors.ownerEmail).toBeDefined()
  })

  it('requires date of birth on step 1', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ...baseStepOneData,
        ownerDateOfBirth: '',
      },
      1,
    )

    expect(errors.ownerDateOfBirth).toBeDefined()
  })

  it('accepts valid step 1 data', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ...baseStepOneData,
      },
      1,
    )

    expect(errors).toEqual({})
  })

  it('requires all fields on step 2', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ...baseStepTwoData,
        patientWeight: '',
      },
      2,
    )

    expect(errors.patientWeight).toBeDefined()
  })

  it('validates complete form before submit', () => {
    const errors = validatePrivacyForm({
      ...initialFormData,
      ownerLastName: 'Mustermann',
      ownerFirstName: 'Max',
      ownerStreet: 'Musterstraße 1',
      ownerPostalCode: '1010',
      ownerCity: 'Wien',
      ownerPhone: '+43 660 1234567',
      ownerEmail: 'max@example.com',
      ownerDateOfBirth: '1990-01-01',
      ...baseStepTwoData,
      signatureDataUrl: 'data:image/png;base64,abc123',
    })

    expect(errors).toEqual({})
  })
})
