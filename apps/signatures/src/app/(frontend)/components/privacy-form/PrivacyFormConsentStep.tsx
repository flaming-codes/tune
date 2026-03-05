'use client'

import { useInputControl } from '@conform-to/react'
import { SignaturePad } from '../SignaturePad'
import { FieldError } from './PrivacyFormFields'
import type { PrivacyFormFields } from './types'

interface PrivacyFormConsentStepProps {
  fields: PrivacyFormFields
  isPending: boolean
}

export function PrivacyFormConsentStep({
  fields,
  isPending,
}: PrivacyFormConsentStepProps) {
  const signatureControl = useInputControl(fields.signatureDataUrl)
  const signatureErrors = fields.signatureDataUrl.errors

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
          Unterschrift {Boolean(signatureErrors?.length) && <span className="text-red-400">*</span>}
        </p>
        <input
          type="hidden"
          name={fields.signatureDataUrl.name}
          value={signatureControl.value ?? ''}
          onChange={() => {}}
        />
        <SignaturePad
          value={signatureControl.value ?? ''}
          onChange={(dataUrl) => signatureControl.change(dataUrl)}
          error={signatureErrors?.length ? 'Erforderlich' : undefined}
          disabled={isPending}
        />
        <FieldError errors={signatureErrors} />
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
