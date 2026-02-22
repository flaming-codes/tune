import type { Metadata } from 'next'
import { PrivacyForm } from './components/PrivacyForm'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Tierarztpraxis Dr. Tune Lazri',
  description:
    'Digitale Datenschutzerklärung für Patienten der Tierarztpraxis Dr. Tune Lazri. Bitte füllen Sie das Formular aus und unterschreiben Sie elektronisch.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-4">
            Tierarztpraxis Dr. Tune Lazri
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-6">
            Datenschutzerklärung
          </h1>
          <p className="text-lg theme-text-secondary leading-relaxed">
            Zur Aufnahme in die Kartei benötigen wir folgende Angaben zu Ihnen und Ihrem Tier.
          </p>
        </div>

        {/* Form */}
        <PrivacyForm />
      </div>
    </main>
  )
}
