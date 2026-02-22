'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export interface PrivacyFormState {
  message?: string
  errors?: Record<string, string[]>
  success?: boolean
}

interface FormData {
  ownerLastName: string
  ownerFirstName: string
  ownerTitle?: string
  ownerDateOfBirth?: string
  ownerStreet: string
  ownerPostalCode: string
  ownerCity: string
  ownerPhone: string
  ownerEmail?: string

  patientName: string
  patientAnimalType: 'dog' | 'cat' | 'other'
  patientBreed?: string
  patientColor?: string
  patientGender?: 'male' | 'female' | 'neutered'
  patientDateOfBirth?: string
  patientWeight?: string
  patientSpecialNotes?: string

  signatureDataUrl: string
}

function validateFormData(data: FormData): Record<string, string[]> {
  const errors: Record<string, string[]> = {}

  // Required owner fields
  if (!data.ownerLastName?.trim()) {
    errors.ownerLastName = ['Nachname ist erforderlich']
  }
  if (!data.ownerFirstName?.trim()) {
    errors.ownerFirstName = ['Vorname ist erforderlich']
  }
  if (!data.ownerStreet?.trim()) {
    errors.ownerStreet = ['Straße/Hausnummer ist erforderlich']
  }
  if (!data.ownerPostalCode?.trim()) {
    errors.ownerPostalCode = ['PLZ ist erforderlich']
  }
  if (!data.ownerCity?.trim()) {
    errors.ownerCity = ['Ort ist erforderlich']
  }
  if (!data.ownerPhone?.trim()) {
    errors.ownerPhone = ['Telefon ist erforderlich']
  }

  // Required patient fields
  if (!data.patientName?.trim()) {
    errors.patientName = ['Patientenname ist erforderlich']
  }
  if (!data.patientAnimalType) {
    errors.patientAnimalType = ['Tierart ist erforderlich']
  }

  // Signature validation
  if (!data.signatureDataUrl?.trim()) {
    errors.signature = ['Unterschrift ist erforderlich']
  }

  return errors
}

export async function submitPrivacyForm(
  _prevState: PrivacyFormState,
  formData: FormData,
): Promise<PrivacyFormState> {
  try {
    // Validate form data
    const errors = validateFormData(formData)
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        message: 'Bitte korrigieren Sie die markierten Felder.',
      }
    }

    // Get client info for audit trail
    const headersList = await headers()
    const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Prepare data for Payload
    const payloadData = {
      ownerLastName: formData.ownerLastName.trim(),
      ownerFirstName: formData.ownerFirstName.trim(),
      ownerFullName: `${formData.ownerFirstName.trim()} ${formData.ownerLastName.trim()}`,
      ownerTitle: formData.ownerTitle?.trim() || undefined,
      ownerDateOfBirth: formData.ownerDateOfBirth || undefined,
      ownerStreet: formData.ownerStreet.trim(),
      ownerPostalCode: formData.ownerPostalCode.trim(),
      ownerCity: formData.ownerCity.trim(),
      ownerPhone: formData.ownerPhone.trim(),
      ownerEmail: formData.ownerEmail?.trim() || undefined,

      patientName: formData.patientName.trim(),
      patientAnimalType: formData.patientAnimalType,
      patientBreed: formData.patientBreed?.trim() || undefined,
      patientColor: formData.patientColor?.trim() || undefined,
      patientGender: formData.patientGender || undefined,
      patientDateOfBirth: formData.patientDateOfBirth || undefined,
      patientWeight: formData.patientWeight?.trim() || undefined,
      patientSpecialNotes: formData.patientSpecialNotes?.trim() || undefined,

      signatureDataUrl: formData.signatureDataUrl,
      signedAt: new Date().toISOString(),
      clientIp: clientIp.split(',')[0]?.trim(),
      userAgent,
    }

    // Create document in Payload
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'privacy-acknowledgments',
      data: payloadData,
    })

    return {
      success: true,
      message:
        'Vielen Dank! Ihre Datenschutzerklärung wurde erfolgreich übermittelt und gespeichert.',
    }
  } catch (error) {
    console.error('Error submitting privacy form:', error)
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    }
  }
}
