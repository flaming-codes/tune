'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { parseWithZod } from '@conform-to/zod/v4'
import type { SubmissionResult } from '@conform-to/react'
import { basePrivacySchema } from '../components/privacy-form/validation'

export type PrivacyFormActionResult =
  | SubmissionResult<string[]>
  | { status: 'success'; message: string }

export async function submitPrivacyForm(
  _prevState: PrivacyFormActionResult | undefined,
  formData: FormData,
): Promise<PrivacyFormActionResult> {
  const submission = parseWithZod(formData, { schema: basePrivacySchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    const data = submission.value

    // Get client info for audit trail
    const headersList = await headers()
    const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Prepare data for Payload
    const payloadData = {
      ownerLastName: data.ownerLastName,
      ownerFirstName: data.ownerFirstName,
      ownerFullName: `${data.ownerFirstName} ${data.ownerLastName}`,
      ownerTitle: data.ownerTitle || undefined,
      ownerDateOfBirth: data.ownerDateOfBirth || undefined,
      ownerStreet: data.ownerStreet,
      ownerPostalCode: data.ownerPostalCode,
      ownerCity: data.ownerCity,
      ownerPhone: data.ownerPhone,
      ownerEmail: data.ownerEmail || undefined,

      patientName: data.patientName,
      patientAnimalType: data.patientAnimalType,
      patientBreed: data.patientBreed || undefined,
      patientColor: data.patientColor || undefined,
      patientGender: data.patientGender || undefined,
      patientDateOfBirth: data.patientDateOfBirth || undefined,
      patientWeight: data.patientWeight || undefined,
      patientSpecialNotes: data.patientSpecialNotes || undefined,

      signatureDataUrl: data.signatureDataUrl,
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
      status: 'success',
      message:
        'Vielen Dank! Ihre Datenschutzerklärung wurde erfolgreich übermittelt und gespeichert.',
    }
  } catch (error) {
    console.error('Error submitting privacy form:', error)
    return submission.reply({
      formErrors: ['Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'],
    })
  }
}
