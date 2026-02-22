import { z } from 'zod'
import type { PrivacyFormData } from './types'

export type PrivacyStep = 1 | 2 | 3

const requiredText = (label: string) => z.string().trim().min(1, `${label} ist erforderlich`)

const optionalDate = z.union([
  z.literal(''),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ungültiges Datum'),
])

const optionalEmail = z.union([
  z.literal(''),
  z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
])

const optionalPhone = z.union([
  z.literal(''),
  z
    .string()
    .trim()
    .regex(/^[+()0-9\s/-]{6,25}$/, 'Bitte geben Sie eine gültige Telefonnummer ein.'),
])

const basePrivacySchema = z.object({
  ownerLastName: requiredText('Nachname'),
  ownerFirstName: requiredText('Vorname'),
  ownerTitle: z.string(),
  ownerDateOfBirth: optionalDate,
  ownerStreet: requiredText('Straße/Hausnummer'),
  ownerPostalCode: requiredText('PLZ'),
  ownerCity: requiredText('Ort'),
  ownerPhone: optionalPhone.pipe(requiredText('Telefon')),
  ownerEmail: optionalEmail,

  patientName: requiredText('Patientenname'),
  patientAnimalType: z.enum(['dog', 'cat', 'other'], {
    error: 'Tierart ist erforderlich',
  }),
  patientBreed: z.string(),
  patientColor: z.string(),
  patientGender: z.union([z.literal(''), z.enum(['male', 'female', 'neutered'])]),
  patientDateOfBirth: optionalDate,
  patientWeight: z.string(),
  patientSpecialNotes: z.string(),

  signatureDataUrl: z
    .string()
    .trim()
    .min(1, 'Unterschrift ist erforderlich')
    .startsWith('data:image/', 'Ungültige Unterschrift'),
})

const stepSchemas: Record<PrivacyStep, z.ZodTypeAny> = {
  1: basePrivacySchema.pick({
    ownerLastName: true,
    ownerFirstName: true,
    ownerStreet: true,
    ownerPostalCode: true,
    ownerCity: true,
    ownerPhone: true,
    ownerEmail: true,
  }),
  2: basePrivacySchema.pick({
    patientName: true,
    patientAnimalType: true,
  }),
  3: basePrivacySchema.pick({
    signatureDataUrl: true,
  }),
}

function mapZodErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors = z.flattenError(error).fieldErrors
  const entries = Object.entries(fieldErrors) as Array<[string, string[] | undefined]>

  return Object.fromEntries(
    entries.map(([field, messages]) => [field, (messages ?? []).filter(Boolean)]),
  )
}

export function validatePrivacyStep(
  data: PrivacyFormData,
  step: PrivacyStep,
): Record<string, string[]> {
  const parsed = stepSchemas[step].safeParse(data)
  if (parsed.success) return {}
  return mapZodErrors(parsed.error)
}

export function validatePrivacyForm(data: PrivacyFormData): Record<string, string[]> {
  const parsed = basePrivacySchema.safeParse(data)
  if (parsed.success) return {}
  return mapZodErrors(parsed.error)
}
