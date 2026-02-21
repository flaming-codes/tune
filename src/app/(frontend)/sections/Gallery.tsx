import React from 'react'

export function Gallery() {
  return (
    <section className="py-24 lg:py-36 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-sm tracking-wide-custom uppercase text-neutral-500 mb-6">
            Galerie
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight-custom leading-tight">
            Das sind unsere tierischen Patienten
          </h2>
          <p className="mt-6 text-neutral-600 leading-relaxed">
            Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large portrait image */}
          <div className="col-span-2 row-span-2">
            <div 
              className="image-placeholder w-full h-full min-h-[300px] lg:min-h-[500px]" 
              aria-label="Tierportrait - Platzhalter" 
            />
          </div>
          
          {/* Regular images */}
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
          <div className="col-span-2">
            <div 
              className="image-placeholder aspect-[2/1]" 
              aria-label="Weitwinkel Tierfoto - Platzhalter" 
            />
          </div>
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
          <div>
            <div 
              className="image-placeholder aspect-square" 
              aria-label="Tierfoto - Platzhalter" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
