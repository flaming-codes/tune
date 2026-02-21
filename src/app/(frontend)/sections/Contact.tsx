import React from 'react'
import { MapLoader } from '../components/MapLoader'

export function Contact() {
  return (
    <section id="kontakt" className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <p className="text-sm tracking-wide-custom uppercase text-neutral-500 mb-6">
              Kontakt
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight mb-8">
              Wir freuen uns auf Sie
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-12">
              Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.
            </p>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide-custom text-neutral-500 mb-3">
                  Adresse
                </h3>
                <address className="not-italic text-neutral-700 leading-relaxed">
                  <p>Tierarztpraxis Dr. Tune Lazri</p>
                  <p>Brünnerstraße 219-221</p>
                  <p>1 TOP 60, 1210 Wien</p>
                  <p className="text-neutral-500">(Einkaufszentrum B7)</p>
                </address>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide-custom text-neutral-500 mb-3">
                  Kontakt
                </h3>
                <div className="space-y-2">
                  <p>
                    <a
                      href="tel:+4369919012012"
                      className="text-neutral-700 hover:text-neutral-900 transition-colors link-underline"
                    >
                      +43 699 190 12 012
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:contact@tierarztpraxis-lazri.at"
                      className="text-neutral-700 hover:text-neutral-900 transition-colors link-underline"
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
            <div className="mt-6 p-6 bg-neutral-50">
              <h3 className="font-medium mb-2">Anfahrt</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
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
