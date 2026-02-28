import { FieldError, SegmentedField, TextAreaField, TextField } from './PrivacyFormFields'
import type { PrivacyFormFields } from './types'

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
  fields: PrivacyFormFields
}

export function PrivacyFormPatientStep({ fields }: PrivacyFormPatientStepProps) {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-3xl lg:text-3xl font-medium tracking-tight leading-tight">
        <span className="theme-text-primary">Ihr Tier.</span>{' '}
        <span className="theme-text-tertiary">Bitte teilen Sie uns einige Informationen mit.</span>
      </h2>

      <div className="space-y-6">
        <div>
          <TextField
            key={fields.patientName.key}
            id={fields.patientName.id}
            name={fields.patientName.name}
            defaultValue={fields.patientName.initialValue ?? ''}
            type="text"
            aria-label="Name des Tieres"
            placeholder="Name des Tieres *"
            invalid={Boolean(fields.patientName.errors?.length)}
            required
          />
          <FieldError errors={fields.patientName.errors} />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm theme-text-tertiary">
            Tierart{' '}
            {Boolean(fields.patientAnimalType.errors?.length) && (
              <span className="text-red-400">*</span>
            )}
          </legend>
          <SegmentedField
            field={fields.patientAnimalType}
            ariaLabel="Tierart"
            options={[...animalTypeOptions]}
            invalid={Boolean(fields.patientAnimalType.errors?.length)}
            required
          />
          <FieldError errors={fields.patientAnimalType.errors} />
        </fieldset>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              key={fields.patientBreed.key}
              id={fields.patientBreed.id}
              name={fields.patientBreed.name}
              defaultValue={fields.patientBreed.initialValue ?? ''}
              type="text"
              aria-label="Rasse"
              placeholder="Rasse *"
              invalid={Boolean(fields.patientBreed.errors?.length)}
              required
            />
            <FieldError errors={fields.patientBreed.errors} />
          </div>
          <div>
            <TextField
              key={fields.patientColor.key}
              id={fields.patientColor.id}
              name={fields.patientColor.name}
              defaultValue={fields.patientColor.initialValue ?? ''}
              type="text"
              aria-label="Farbe"
              placeholder="Farbe *"
              invalid={Boolean(fields.patientColor.errors?.length)}
              required
            />
            <FieldError errors={fields.patientColor.errors} />
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm theme-text-tertiary">
            Geschlecht{' '}
            {Boolean(fields.patientGender.errors?.length) && (
              <span className="text-red-400">*</span>
            )}
          </legend>
          <SegmentedField
            field={fields.patientGender}
            ariaLabel="Geschlecht"
            options={[...patientGenderOptions]}
            invalid={Boolean(fields.patientGender.errors?.length)}
            required
          />
          <FieldError errors={fields.patientGender.errors} />
        </fieldset>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              key={fields.patientDateOfBirth.key}
              id={fields.patientDateOfBirth.id}
              name={fields.patientDateOfBirth.name}
              defaultValue={fields.patientDateOfBirth.initialValue ?? ''}
              type="date"
              aria-label="Geburtsdatum Tier"
              invalid={Boolean(fields.patientDateOfBirth.errors?.length)}
              required
            />
            <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum *</p>
            <FieldError errors={fields.patientDateOfBirth.errors} />
          </div>
          <div>
            <div className="relative">
              <TextField
                key={fields.patientWeight.key}
                id={fields.patientWeight.id}
                name={fields.patientWeight.name}
                defaultValue={fields.patientWeight.initialValue ?? ''}
                type="text"
                aria-label="Gewicht"
                placeholder="Gewicht *"
                invalid={Boolean(fields.patientWeight.errors?.length)}
                className="pr-12"
                inputMode="decimal"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium theme-text-tertiary">
                kg
              </span>
            </div>
            <FieldError errors={fields.patientWeight.errors} />
          </div>
        </div>

        <div>
          <TextAreaField
            key={fields.patientSpecialNotes.key}
            id={fields.patientSpecialNotes.id}
            name={fields.patientSpecialNotes.name}
            defaultValue={fields.patientSpecialNotes.initialValue ?? ''}
            rows={3}
            aria-label="Besondere Hinweise"
            placeholder="Besondere Hinweise (Allergien, Unverträglichkeiten...)"
            invalid={false}
          />
          <FieldError errors={fields.patientSpecialNotes.errors} />
        </div>
      </div>
    </div>
  )
}
