import React from 'react'
import { QuickServices } from '../components/QuickServices'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-24 lg:pb-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
              Tierarztpraxis
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight-custom leading-tight mb-8">
              Dr. Tune Lazri
            </h1>
            <p className="text-lg theme-text-secondary leading-relaxed mb-10 max-w-lg">
              Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren 
              Liebling gerne bei Ihnen zu Hause.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center px-8 py-3 theme-bg-dark theme-text-inverse text-sm font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Termin vereinbaren
              </a>
              <a
                href="#leistungen"
                className="inline-flex items-center justify-center px-8 py-3 border theme-border-primary theme-text-primary text-sm font-medium hover:border-current hover:theme-bg-secondary transition-all duration-200"
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

        {/* Quick Services - Standalone Component */}
        <QuickServices />
      </div>
    </section>
  )
}
