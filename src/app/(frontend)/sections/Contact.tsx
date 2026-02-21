import React from 'react'
import { MapLoader } from '../components/MapLoader'

export function Contact() {
  return (
    <section id="kontakt" className="py-24 lg:py-36 theme-bg-primary">
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
                  <p>Tierarztpraxis Dr. Tune Lazri</p>
                  <p>Brünnerstraße 219-221</p>
                  <p>1 TOP 60, 1210 Wien</p>
                  <p className="theme-text-muted">(Einkaufszentrum B7)</p>
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
                      href="tel:+4369919012012"
                      className="theme-text-secondary hover:theme-text-primary transition-colors link-underline"
                    >
                      +43 699 190 12 012
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:contact@tierarztpraxis-lazri.at"
                      className="theme-text-secondary hover:theme-text-primary transition-colors link-underline"
                    >
                      contact@tierarztpraxis-lazri.at
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
              <p className="text-sm theme-text-secondary leading-relaxed">
                Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. 
                Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
