import { SignaturePad } from '../SignaturePad'
import type { IsPrivacyFieldInvalid, PrivacyFormData, UpdatePrivacyField } from './types'

interface PrivacyFormConsentStepProps {
  formData: PrivacyFormData
  updateField: UpdatePrivacyField
  isFieldInvalid: IsPrivacyFieldInvalid
  isPending: boolean
}

export function PrivacyFormConsentStep({
  formData,
  updateField,
  isFieldInvalid,
  isPending,
}: PrivacyFormConsentStepProps) {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-3xl lg:text-3xl font-medium tracking-tight leading-tight">
        <span className="theme-text-primary">Fast fertig.</span>{' '}
        <span className="theme-text-tertiary">Bitte unterschreiben.</span>
      </h2>

      <div className="py-8 border-y theme-border-primary">
        <p className="theme-text-secondary leading-relaxed">
          Ich bestätige hiermit mit meiner Unterschrift, dass es sich um mein eigenes Tier handelt
          oder, dass die Behandlung vom Tierhalter ausdrücklich gewünscht wird. Ich erkläre mich
          einverstanden, dass meine Daten im Rahmen der Praxistätigkeit unter Wahrung der DSGVO
          elektronisch verarbeitet werden dürfen.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm theme-text-tertiary">
          Unterschrift{' '}
          {isFieldInvalid('signatureDataUrl') && <span className="text-red-400">*</span>}
        </p>
        <SignaturePad
          value={formData.signatureDataUrl}
          onChange={(value) => updateField('signatureDataUrl', value)}
          error={isFieldInvalid('signatureDataUrl') ? 'Erforderlich' : undefined}
          disabled={isPending}
        />
      </div>

      <p className="theme-text-secondary">
        <span className="theme-text-tertiary">Datum:</span>{' '}
        {new Date().toLocaleDateString('de-AT', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
