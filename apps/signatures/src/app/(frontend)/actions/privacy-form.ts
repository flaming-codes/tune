'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { validatePrivacyForm } from '../components/privacy-form/validation'
import type { PrivacyFormData } from '../components/privacy-form/types'

export interface PrivacyFormState {
  message?: string
  errors?: Record<string, string[]>
  success?: boolean
}

export async function submitPrivacyForm(
  _prevState: PrivacyFormState,
  formData: PrivacyFormData,
): Promise<PrivacyFormState> {
  try {
    // Validate form data
    const errors = validatePrivacyForm(formData)
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
      patientAnimalType: formData.patientAnimalType as 'dog' | 'cat' | 'other',
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
