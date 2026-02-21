import React from 'react'
import { MapLoader } from '../components/MapLoader'
import type { SiteSetting } from '@/payload-types'

interface ContactProps {
  contact: SiteSetting['contact']
}

export function Contact({ contact }: ContactProps) {
  const { address, phone, email } = contact

  return (
    <section id="kontakt" className="py-24 lg:py-36 theme-bg-offgray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
              Kontakt
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-8">
              Wir freuen uns auf Sie
            </h2>
            <p className="text-lg theme-text-secondary leading-relaxed mb-12">
              Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.
            </p>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide-custom theme-text-tertiary mb-3">
                  Adresse
                </h3>
                <address className="not-italic theme-text-secondary leading-relaxed">
                  <p>{address.street}</p>
                  <p>{address.additional}</p>
                  <p>{address.city}</p>
                </address>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide-custom theme-text-tertiary mb-3">
                  Kontakt
                </h3>
                <div className="space-y-2">
                  <p>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="theme-text-secondary hover:theme-text-primary transition-colors link-underline"
                    >
                      {phone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${email}`}
                      className="theme-text-secondary hover:theme-text-primary transition-colors link-underline"
                    >
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col">
            <MapLoader />
            <div className="mt-6 p-6 theme-bg-secondary transition-colors hover:theme-bg-tertiary">
              <h3 className="font-medium mb-2">Anfahrt</h3>
              <p className="text-sm theme-text-secondary leading-relaxed mb-4">
                Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. 
                Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.
              </p>
              <a
                href={`https://maps.google.com/maps/dir//${encodeURIComponent(
                  `${address.street}, ${address.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium theme-text-primary hover:theme-text-secondary transition-colors link-underline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                In Google Maps öffnen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
