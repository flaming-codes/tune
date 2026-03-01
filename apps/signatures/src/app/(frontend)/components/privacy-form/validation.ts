import { z } from 'zod'
import type { PrivacyFormData } from './types'

export type PrivacyStep = 1 | 2 | 3

const REQUIRED = 'Bitte füllen Sie dieses Feld aus.'

const requiredText = () => z.string().trim().min(1, REQUIRED)

const requiredPostalCode = z
  .string()
  .trim()
  .min(1, REQUIRED)
  .regex(/^\d{4,10}$/, 'Bitte geben Sie eine gültige PLZ ein.')

const requiredWeight = z
  .string()
  .trim()
  .min(1, REQUIRED)
  .regex(/^\d+(?:[.,]\d+)?$/, 'Bitte geben Sie ein gültiges Gewicht ein.')

const requiredDate = () =>
  z
    .string()
    .trim()
    .min(1, REQUIRED)
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Bitte geben Sie ein gültiges Datum ein.')

const optionalPhone = z.union([
  z.literal(''),
  z
    .string()
    .trim()
    .regex(/^[+()0-9\s/-]{6,25}$/, 'Bitte geben Sie eine gültige Telefonnummer ein.'),
])

export const basePrivacySchema = z.object({
  ownerLastName: requiredText(),
  ownerFirstName: requiredText(),
  ownerTitle: z.string().optional().default(''),
  ownerDateOfBirth: requiredDate(),
  ownerStreet: requiredText(),
  ownerPostalCode: requiredPostalCode,
  ownerCity: requiredText(),
  ownerPhone: optionalPhone.pipe(requiredText()),
  ownerEmail: z
    .string()
    .trim()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
    .optional()
    .default(''),

  patientName: requiredText(),
  patientAnimalType: z.enum(['dog', 'cat', 'other'], {
    error: 'Bitte wählen Sie eine Option aus.',
  }),
  patientBreed: requiredText(),
  patientColor: requiredText(),
  patientGender: z.enum(['male', 'female', 'neutered'], {
    error: 'Bitte wählen Sie eine Option aus.',
  }),
  patientDateOfBirth: requiredDate(),
  patientWeight: requiredWeight,
  patientSpecialNotes: z.string().optional().default(''),

  signatureDataUrl: z
    .string()
    .trim()
    .min(1, 'Bitte leisten Sie Ihre Unterschrift.')
    .startsWith('data:image/', 'Ungültige Unterschrift'),
})

export const stepSchemas: Record<PrivacyStep, z.ZodTypeAny> = {
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
