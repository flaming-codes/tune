import { z } from 'zod'
import type { PrivacyFormData } from './types'

export type PrivacyStep = 1 | 2 | 3

const requiredText = (label: string) => z.string().trim().min(1, `${label} ist erforderlich`)

const requiredPostalCode = z
  .string()
  .trim()
  .min(1, 'PLZ ist erforderlich')
  .regex(/^\d{4,10}$/, 'Bitte geben Sie eine gültige PLZ ein.')

const requiredWeight = z
  .string()
  .trim()
  .min(1, 'Gewicht ist erforderlich')
  .regex(/^\d+(?:[.,]\d+)?$/, 'Bitte geben Sie ein gültiges Gewicht ein.')

const requiredDate = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} ist erforderlich`)
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ungültiges Datum')

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
  ownerDateOfBirth: requiredDate('Geburtsdatum'),
  ownerStreet: requiredText('Straße/Hausnummer'),
  ownerPostalCode: requiredPostalCode,
  ownerCity: requiredText('Ort'),
  ownerPhone: optionalPhone.pipe(requiredText('Telefon')),
  ownerEmail: optionalEmail,

  patientName: requiredText('Patientenname'),
  patientAnimalType: z.enum(['dog', 'cat', 'other'], {
    error: 'Tierart ist erforderlich',
  }),
  patientBreed: requiredText('Rasse'),
  patientColor: requiredText('Farbe'),
  patientGender: z.enum(['male', 'female', 'neutered'], {
    error: 'Geschlecht ist erforderlich',
  }),
  patientDateOfBirth: requiredDate('Geburtsdatum'),
  patientWeight: requiredWeight,
  patientSpecialNotes: requiredText('Besondere Hinweise'),

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
    ownerDateOfBirth: true,
  }),
  2: basePrivacySchema.pick({
    patientName: true,
    patientAnimalType: true,
    patientBreed: true,
    patientColor: true,
    patientGender: true,
    patientDateOfBirth: true,
    patientWeight: true,
    patientSpecialNotes: true,
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
