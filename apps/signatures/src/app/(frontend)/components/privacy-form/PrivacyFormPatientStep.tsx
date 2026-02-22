import { SegmentedField, TextAreaField, TextField } from './PrivacyFormFields'
import type { IsPrivacyFieldInvalid, PrivacyFormData, UpdatePrivacyField } from './types'

const animalTypeOptions = [
  { value: 'dog', label: 'Hund' },
  { value: 'cat', label: 'Katze' },
  { value: 'other', label: 'Andere' },
] as const

const patientGenderOptions = [
  { value: 'male', label: 'Männlich' },
  { value: 'female', label: 'Weiblich' },
  { value: 'neutered', label: 'Kastriert' },
] as const

interface PrivacyFormPatientStepProps {
  formData: PrivacyFormData
  updateField: UpdatePrivacyField
  isFieldInvalid: IsPrivacyFieldInvalid
}

export function PrivacyFormPatientStep({
  formData,
  updateField,
  isFieldInvalid,
}: PrivacyFormPatientStepProps) {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
        <span className="theme-text-primary">Patient.</span>{' '}
        <span className="theme-text-tertiary">Informationen zu Ihrem Tier.</span>
      </h2>

      <div className="space-y-6">
        <div>
          <TextField
            type="text"
            value={formData.patientName}
            onChange={(e) => updateField('patientName', e.target.value)}
            aria-label="Name des Tieres"
            aria-invalid={isFieldInvalid('patientName')}
            placeholder="Name des Tieres *"
            invalid={isFieldInvalid('patientName')}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm theme-text-tertiary">
            Tierart {isFieldInvalid('patientAnimalType') && <span className="text-red-400">*</span>}
          </legend>
          <SegmentedField
            name="patientAnimalType"
            ariaLabel="Tierart"
            options={[...animalTypeOptions]}
            value={formData.patientAnimalType}
            onChange={(value) => updateField('patientAnimalType', value)}
            invalid={isFieldInvalid('patientAnimalType')}
            required
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              type="text"
              value={formData.patientBreed}
              onChange={(e) => updateField('patientBreed', e.target.value)}
              aria-label="Rasse"
              placeholder="Rasse"
              invalid={false}
            />
          </div>
          <div>
            <TextField
              type="text"
              value={formData.patientColor}
              onChange={(e) => updateField('patientColor', e.target.value)}
              aria-label="Farbe"
              placeholder="Farbe"
              invalid={false}
            />
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm theme-text-tertiary">Geschlecht</legend>
          <SegmentedField
            name="patientGender"
            ariaLabel="Geschlecht"
            options={[...patientGenderOptions]}
            value={formData.patientGender}
            onChange={(value) => updateField('patientGender', value)}
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              type="date"
              value={formData.patientDateOfBirth}
              onChange={(e) => updateField('patientDateOfBirth', e.target.value)}
              aria-label="Geburtsdatum Tier"
              invalid={false}
            />
            <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum</p>
          </div>
          <div>
            <TextField
              type="text"
              value={formData.patientWeight}
              onChange={(e) => updateField('patientWeight', e.target.value)}
              aria-label="Gewicht"
              placeholder="Gewicht"
              invalid={false}
            />
          </div>
        </div>

        <div>
          <TextAreaField
            rows={3}
            value={formData.patientSpecialNotes}
            onChange={(e) => updateField('patientSpecialNotes', e.target.value)}
            aria-label="Besondere Hinweise"
            placeholder="Besondere Hinweise (Allergien, Unverträglichkeiten...)"
            invalid={false}
          />
        </div>
      </div>
    </div>
  )
}
