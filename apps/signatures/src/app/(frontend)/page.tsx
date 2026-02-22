import type { Metadata } from 'next'
import { PrivacyFormScreensaver } from './components/PrivacyFormScreensaver'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Tierarztpraxis Dr. Tune Lazri',
  description: 'Digitale Datenschutzerklärung für Patienten der Tierarztpraxis Dr. Tune Lazri.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen theme-bg-primary">
      <PrivacyFormScreensaver />
    </main>
  )
}
