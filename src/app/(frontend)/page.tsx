import React from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'
import { Gallery } from './sections/Gallery'
import { Team } from './sections/Team'
import { Hours } from './sections/Hours'
import { Contact } from './sections/Contact'
import { Footer } from './components/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Gallery />
        <Team />
        <Hours />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
