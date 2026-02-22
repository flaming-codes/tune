import React from 'react'

const services = [
  {
    category: 'Vorsorge',
    items: [
      'Labor-Check (hausinterne Diagnostik)',
      'Schutzimpfungen',
      'Parasitenprophylaxe',
      'Vorsorge Untersuchungen',
    ],
  },
  {
    category: 'Diagnostik',
    items: [
      'Hausinternes Blutlabor',
      'Elektronische Tierkennzeichnung',
      'Therapie chronischer und akuter Erkrankungen',
    ],
  },
  {
    category: 'Operationen',
    items: [
      'Weichteilchirurgie inkl. Sterilisation',
      'Zahnbehandlungen',
    ],
  },
  {
    category: 'Alternative Therapie',
    items: [
      'Chiropraktik',
      'Lasertherapie',
      'Schmerztherapie und alternative Schmerztherapie',
    ],
  },
  {
    category: 'Beratung',
    items: [
      'Ernährungsberatung',
      'Zoonoseerreger bzw. Leishmaniose',
      'Therapie und Beratung',
      'Hausapotheke',
    ],
  },
]

export function Services() {
  return (
    <section id="leistungen" className="py-24 lg:py-36 theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            Leistungen
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Umfassende tierärztliche Betreuung für Ihren Liebling
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((group) => (
            <div key={group.category} className="group">
              <h3 className="text-lg font-medium mb-6 pb-4 border-b border-neutral-300 dark:border-neutral-800 transition-colors duration-300 group-hover:border-neutral-900 dark:group-hover:border-white">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-sm theme-text-secondary leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 lg:mt-28 pt-12 border-t theme-border-primary">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg theme-text-secondary">
              Haben Sie Fragen zu unseren Leistungen?
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Kontaktieren Sie uns
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
