'use client'

import { useField } from '@payloadcms/ui'

const SignaturePreviewAfterInput = ({ path }: { path: string }) => {
  const { value } = useField<string>({ path })
  const strValue = typeof value === 'string' ? value : undefined

  if (!strValue) {
    return (
      <div className="field-type text">
        <span className="placeholder">Bisher keine Unterschrift verfügbar.</span>
      </div>
    )
  }

  return (
    <div className="field-type text" style={{ marginTop: '0.75rem' }}>
      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 'var(--style-radius)',
          padding: '0.25rem',
          boxShadow: '0 0 0 1px var(--theme-elevation-100)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={strValue}
          alt="Unterschrift"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 'calc(var(--style-radius) / 2)',
          }}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export { SignaturePreviewAfterInput }
export default SignaturePreviewAfterInput
