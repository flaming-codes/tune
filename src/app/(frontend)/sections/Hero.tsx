import React from 'react'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm tracking-wide-custom uppercase text-neutral-500 mb-6">
              Tierarztpraxis
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight-custom leading-tight mb-8">
              Dr. Tune Lazri
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-10 max-w-lg">
              Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren 
              Liebling gerne bei Ihnen zu Hause.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Termin vereinbaren
              </a>
              <a
                href="#leistungen"
                className="inline-flex items-center justify-center px-8 py-3 border border-neutral-300 text-sm font-medium hover:border-neutral-900 hover:text-neutral-900 transition-colors"
              >
                Leistungen
              </a>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="order-1 lg:order-2">
            <div className="image-placeholder aspect-[4/5] lg:aspect-[3/4]" aria-label="Portrait Dr. Tune Lazri - Platzhalter" />
          </div>
        </div>

        {/* Quick Services */}
        <div className="mt-24 lg:mt-36 grid grid-cols-2 md:grid-cols-5 gap-8 pt-16 border-t border-neutral-200">
          {[
            'Vorsorge Untersuchungen',
            'Diagnostik',
            'Operationen',
            'Schmerztherapie',
            'Hausbesuche',
          ].map((service) => (
            <div key={service} className="text-center">
              <p className="text-sm text-neutral-600">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
