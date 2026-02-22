import React from 'react'

interface ServicesProps {
  content: {
    eyebrow: string
    headline: string
    groups: {
      id?: string | null
      category: string
      items: {
        id?: string | null
        text: string
      }[]
    }[]
    ctaText: string
    ctaButtonLabel: string
    ctaButtonHref: string
  }
}

export function Services({ content }: ServicesProps) {
  return (
    <section id="leistungen" className="py-24 lg:py-36 theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 lg:mb-28">
          <p className="text-sm tracking-wide-custom uppercase theme-text-tertiary mb-6">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            {content.headline}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {content.groups.map((group) => (
            <div key={group.id || group.category} className="group">
              <h3 className="text-lg font-medium mb-6 pb-4 border-b border-neutral-300 dark:border-neutral-800 transition-colors duration-300 group-hover:border-neutral-900 dark:group-hover:border-white">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.id || item.text}
                    className="text-sm theme-text-secondary leading-relaxed"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 lg:mt-28 pt-12 border-t theme-border-primary">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg theme-text-secondary">{content.ctaText}</p>
            <a
              href={content.ctaButtonHref}
              className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              {content.ctaButtonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
