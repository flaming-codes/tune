import { describe, expect, it } from 'vitest'
import { initialFormData } from '@/app/(frontend)/components/privacy-form/types'
import {
  validatePrivacyForm,
  validatePrivacyStep,
} from '@/app/(frontend)/components/privacy-form/validation'

describe('privacy form validation', () => {
  it('blocks step 1 advance on invalid email', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ownerLastName: 'Mustermann',
        ownerFirstName: 'Max',
        ownerStreet: 'Musterstraße 1',
        ownerPostalCode: '1010',
        ownerCity: 'Wien',
        ownerPhone: '+43 660 1234567',
        ownerEmail: 'invalid-email',
      },
      1,
    )

    expect(errors.ownerEmail).toBeDefined()
  })

  it('accepts valid step 1 data', () => {
    const errors = validatePrivacyStep(
      {
        ...initialFormData,
        ownerLastName: 'Mustermann',
        ownerFirstName: 'Max',
        ownerStreet: 'Musterstraße 1',
        ownerPostalCode: '1010',
        ownerCity: 'Wien',
        ownerPhone: '+43 660 1234567',
        ownerEmail: 'max@example.com',
      },
      1,
    )

    expect(errors).toEqual({})
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
      patientName: 'Bello',
      patientAnimalType: 'dog',
      signatureDataUrl: 'data:image/png;base64,abc123',
    })

    expect(errors).toEqual({})
  })
})
