import type { Metadata } from 'next'
import { PrivacyForm } from './components/PrivacyForm'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Tierarztpraxis Dr. Tune Lazri',
  description: 'Digitale Datenschutzerklärung für Patienten der Tierarztpraxis Dr. Tune Lazri.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen theme-bg-primary">
      <PrivacyForm />
    </main>
  )
}
