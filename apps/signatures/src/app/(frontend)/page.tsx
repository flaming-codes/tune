import type { Metadata } from 'next'
import { PrivacyForm } from './components/PrivacyForm'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Tierarztpraxis Dr. Tune Lazri',
  description:
    'Digitale Datenschutzerklärung für Patienten der Tierarztpraxis Dr. Tune Lazri.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 lg:py-24">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
        <div className="max-w-xl">
          <p className="text-xs tracking-wide theme-text-tertiary uppercase mb-4">
            Tierarztpraxis Dr. Tune Lazri
          </p>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight-custom leading-tight">
            Datenschutzerklärung
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <PrivacyForm />
      </div>
    </main>
  )
}
