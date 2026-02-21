'use client'

import React, { useState } from 'react'


const services = [
  { id: 'vorsorge', num: '01', label: 'Vorsorge Untersuchungen' },
  { id: 'diagnostik', num: '02', label: 'Diagnostik' },
  { id: 'operationen', num: '03', label: 'Operationen' },
  { id: 'schmerztherapie', num: '04', label: 'Schmerztherapie' },
  { id: 'hausbesuche', num: '05', label: 'Hausbesuche' },
]

export function QuickServices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="mt-24 lg:mt-36">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <p className="text-sm tracking-wide-custom uppercase text-neutral-400">
          Unsere Schwerpunkte
        </p>
      </div>

      {/* Services List - Vertical stacked with reveal */}
      <div className="space-y-0 border-t border-neutral-200">
        {services.map((service, index) => (
          <a
            key={service.id}
            href="#leistungen"
            className="group block border-b border-neutral-200 py-6 lg:py-8"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-6 lg:gap-12">
              {/* Number */}
              <span 
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeIndex === index ? 'text-neutral-900' : 'text-neutral-300'
                }`}
              >
                {service.num}
              </span>
              
              {/* Label */}
              <span 
                className={`text-lg lg:text-xl font-medium tracking-tight-custom transition-all duration-300 ${
                  activeIndex === index 
                    ? 'text-neutral-900 translate-x-2' 
                    : 'text-neutral-500'
                }`}
              >
                {service.label}
              </span>

              {/* Arrow - appears on hover */}
              <span 
                className={`ml-auto text-sm transition-all duration-300 ${
                  activeIndex === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2'
                }`}
              >
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
