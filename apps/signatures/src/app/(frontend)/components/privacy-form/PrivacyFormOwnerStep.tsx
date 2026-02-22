import { TextField } from './PrivacyFormFields'
import type { IsPrivacyFieldInvalid, PrivacyFormData, UpdatePrivacyField } from './types'

interface PrivacyFormOwnerStepProps {
  formData: PrivacyFormData
  updateField: UpdatePrivacyField
  isFieldInvalid: IsPrivacyFieldInvalid
}

export function PrivacyFormOwnerStep({
  formData,
  updateField,
  isFieldInvalid,
}: PrivacyFormOwnerStepProps) {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-3xl lg:text-3xl font-medium tracking-tight leading-tight">
        <span className="theme-text-primary">Hallo!</span>{' '}
        <span className="theme-text-tertiary">Bitte geben Sie Ihre Daten ein.</span>
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <TextField
              type="text"
              value={formData.ownerTitle}
              onChange={(e) => updateField('ownerTitle', e.target.value)}
              aria-label="Titel"
              placeholder="Titel"
              invalid={false}
            />
          </div>
          <div className="col-span-5">
            <TextField
              type="text"
              value={formData.ownerFirstName}
              onChange={(e) => updateField('ownerFirstName', e.target.value)}
              aria-label="Vorname"
              aria-invalid={isFieldInvalid('ownerFirstName')}
              placeholder="Vorname *"
              invalid={isFieldInvalid('ownerFirstName')}
            />
          </div>
          <div className="col-span-5">
            <TextField
              type="text"
              value={formData.ownerLastName}
              onChange={(e) => updateField('ownerLastName', e.target.value)}
              aria-label="Nachname"
              aria-invalid={isFieldInvalid('ownerLastName')}
              placeholder="Nachname *"
              invalid={isFieldInvalid('ownerLastName')}
            />
          </div>
        </div>

        <div>
          <TextField
            type="date"
            value={formData.ownerDateOfBirth}
            onChange={(e) => updateField('ownerDateOfBirth', e.target.value)}
            aria-label="Geburtsdatum Besitzer"
            aria-invalid={isFieldInvalid('ownerDateOfBirth')}
            className="w-full sm:w-64"
            invalid={isFieldInvalid('ownerDateOfBirth')}
            required
          />
          <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum *</p>
        </div>

        <div>
          <TextField
            type="text"
            value={formData.ownerStreet}
            onChange={(e) => updateField('ownerStreet', e.target.value)}
            aria-label="Straße und Hausnummer"
            aria-invalid={isFieldInvalid('ownerStreet')}
            placeholder="Straße, Hausnummer *"
            invalid={isFieldInvalid('ownerStreet')}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              type="number"
              value={formData.ownerPostalCode}
              onChange={(e) => updateField('ownerPostalCode', e.target.value)}
              aria-label="Postleitzahl"
              aria-invalid={isFieldInvalid('ownerPostalCode')}
              placeholder="PLZ *"
              invalid={isFieldInvalid('ownerPostalCode')}
              inputMode="numeric"
              min={0}
              step={1}
            />
          </div>
          <div>
            <TextField
              type="text"
              value={formData.ownerCity}
              onChange={(e) => updateField('ownerCity', e.target.value)}
              aria-label="Ort"
              aria-invalid={isFieldInvalid('ownerCity')}
              placeholder="Ort *"
              invalid={isFieldInvalid('ownerCity')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <TextField
              type="tel"
              value={formData.ownerPhone}
              onChange={(e) => updateField('ownerPhone', e.target.value)}
              aria-label="Telefon"
              aria-invalid={isFieldInvalid('ownerPhone')}
              placeholder="Telefon *"
              invalid={isFieldInvalid('ownerPhone')}
            />
          </div>
          <div>
            <TextField
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => updateField('ownerEmail', e.target.value)}
              aria-label="E-Mail"
              placeholder="E-Mail"
              invalid={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
