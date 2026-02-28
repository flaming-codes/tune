import { FieldError, TextField } from './PrivacyFormFields'
import type { PrivacyFormFields } from './types'

interface PrivacyFormOwnerStepProps {
  fields: PrivacyFormFields
}

export function PrivacyFormOwnerStep({ fields }: PrivacyFormOwnerStepProps) {
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
              key={fields.ownerTitle.key}
              id={fields.ownerTitle.id}
              name={fields.ownerTitle.name}
              defaultValue={fields.ownerTitle.initialValue ?? ''}
              type="text"
              aria-label="Titel"
              placeholder="Titel"
              invalid={false}
            />
          </div>
          <div className="col-span-5">
            <TextField
              key={fields.ownerFirstName.key}
              id={fields.ownerFirstName.id}
              name={fields.ownerFirstName.name}
              defaultValue={fields.ownerFirstName.initialValue ?? ''}
              type="text"
              aria-label="Vorname"
              placeholder="Vorname *"
              invalid={Boolean(fields.ownerFirstName.errors?.length)}
            />
            <FieldError errors={fields.ownerFirstName.errors} />
          </div>
          <div className="col-span-5">
            <TextField
              key={fields.ownerLastName.key}
              id={fields.ownerLastName.id}
              name={fields.ownerLastName.name}
              defaultValue={fields.ownerLastName.initialValue ?? ''}
              type="text"
              aria-label="Nachname"
              placeholder="Nachname *"
              invalid={Boolean(fields.ownerLastName.errors?.length)}
            />
            <FieldError errors={fields.ownerLastName.errors} />
          </div>
        </div>

        <div>
          <TextField
            key={fields.ownerDateOfBirth.key}
            id={fields.ownerDateOfBirth.id}
            name={fields.ownerDateOfBirth.name}
            defaultValue={fields.ownerDateOfBirth.initialValue ?? ''}
            type="date"
            aria-label="Geburtsdatum Besitzer"
            className="w-full sm:w-64"
            invalid={Boolean(fields.ownerDateOfBirth.errors?.length)}
            required
          />
          <p className="text-sm theme-text-tertiary mt-2">Geburtsdatum *</p>
          <FieldError errors={fields.ownerDateOfBirth.errors} />
        </div>

        <div>
          <TextField
            key={fields.ownerStreet.key}
            id={fields.ownerStreet.id}
            name={fields.ownerStreet.name}
            defaultValue={fields.ownerStreet.initialValue ?? ''}
            type="text"
            aria-label="Straße und Hausnummer"
            placeholder="Straße, Hausnummer *"
            invalid={Boolean(fields.ownerStreet.errors?.length)}
          />
          <FieldError errors={fields.ownerStreet.errors} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <TextField
              key={fields.ownerPostalCode.key}
              id={fields.ownerPostalCode.id}
              name={fields.ownerPostalCode.name}
              defaultValue={fields.ownerPostalCode.initialValue ?? ''}
              type="text"
              aria-label="Postleitzahl"
              placeholder="PLZ *"
              invalid={Boolean(fields.ownerPostalCode.errors?.length)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <FieldError errors={fields.ownerPostalCode.errors} />
          </div>
          <div>
            <TextField
              key={fields.ownerCity.key}
              id={fields.ownerCity.id}
              name={fields.ownerCity.name}
              defaultValue={fields.ownerCity.initialValue ?? ''}
              type="text"
              aria-label="Ort"
              placeholder="Ort *"
              invalid={Boolean(fields.ownerCity.errors?.length)}
            />
            <FieldError errors={fields.ownerCity.errors} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <TextField
              key={fields.ownerPhone.key}
              id={fields.ownerPhone.id}
              name={fields.ownerPhone.name}
              defaultValue={fields.ownerPhone.initialValue ?? ''}
              type="tel"
              aria-label="Telefon"
              placeholder="Telefon *"
              invalid={Boolean(fields.ownerPhone.errors?.length)}
            />
            <FieldError errors={fields.ownerPhone.errors} />
          </div>
          <div>
            <TextField
              key={fields.ownerEmail.key}
              id={fields.ownerEmail.id}
              name={fields.ownerEmail.name}
              defaultValue={fields.ownerEmail.initialValue ?? ''}
              type="email"
              aria-label="E-Mail"
              placeholder="E-Mail"
              invalid={Boolean(fields.ownerEmail.errors?.length)}
            />
            <FieldError errors={fields.ownerEmail.errors} />
          </div>
        </div>
      </div>
    </div>
  )
}
