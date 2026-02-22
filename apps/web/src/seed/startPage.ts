import type { Payload } from 'payload'
import type { StartPage } from '@/payload-types'

const defaultStartPageData = {
  header: [
    {
      blockType: 'navigation',
      practiceName: 'Tierarztpraxis Dr. Tune Lazri',
      phone: '+43 699 190 12 012',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Leistungen', href: '#leistungen' },
        { label: 'Über uns', href: '#team' },
        { label: 'Kontakt', href: '#kontakt' },
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutzerklärung', href: '/datenschutzerklarung' },
      ],
    },
  ],
  layout: [
    {
      blockType: 'hero',
      headline: 'Dr. Tune Lazri',
      subheadline: 'Tierarztpraxis',
      description:
        'Wir sind gerne für Sie und Ihren Liebling da. Auf Wunsch besuche ich Sie und Ihren Liebling gerne bei Ihnen zu Hause.',
      ctaPrimaryText: 'Termin vereinbaren',
      ctaPrimaryHref: '#kontakt',
      ctaSecondaryText: 'Leistungen',
      ctaSecondaryHref: '#leistungen',
    },
    {
      blockType: 'services',
      eyebrow: 'Leistungen',
      headline: 'Umfassende tierärztliche Betreuung für Ihren Liebling',
      groups: [
        {
          category: 'Vorsorge',
          items: [
            { text: 'Labor-Check (hausinterne Diagnostik)' },
            { text: 'Schutzimpfungen' },
            { text: 'Parasitenprophylaxe' },
            { text: 'Vorsorge Untersuchungen' },
          ],
        },
        {
          category: 'Diagnostik',
          items: [
            { text: 'Hausinternes Blutlabor' },
            { text: 'Elektronische Tierkennzeichnung' },
            { text: 'Therapie chronischer und akuter Erkrankungen' },
          ],
        },
        {
          category: 'Operationen',
          items: [{ text: 'Weichteilchirurgie inkl. Sterilisation' }, { text: 'Zahnbehandlungen' }],
        },
        {
          category: 'Alternative Therapie',
          items: [
            { text: 'Chiropraktik' },
            { text: 'Lasertherapie' },
            { text: 'Schmerztherapie und alternative Schmerztherapie' },
          ],
        },
        {
          category: 'Beratung',
          items: [
            { text: 'Ernährungsberatung' },
            { text: 'Zoonoseerreger bzw. Leishmaniose' },
            { text: 'Therapie und Beratung' },
            { text: 'Hausapotheke' },
          ],
        },
      ],
      ctaText: 'Haben Sie Fragen zu unseren Leistungen?',
      ctaButtonLabel: 'Kontaktieren Sie uns',
      ctaButtonHref: '#kontakt',
    },
    {
      blockType: 'quote',
      text: 'Die Liebe zu Tieren ist eine der edelsten Eigenschaften des menschlichen Herzens. Jeder Tierarzt trägt die Verantwortung, diese Liebe mit Wissen, Mitgefühl und Hingabe zu ehren.',
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Erfahrungen',
      headline: 'Was die Lieblingsmenschen unserer Fellnasen über uns sagen',
      description:
        'Wir reden ungern über uns selbst, daher lassen wir lieber die Frauchen und Herrchen erzählen. Schau Dir ihre Erfahrungen an und überzeuge Dich selbst!',
      googleReviewUrl:
        'https://search.google.com/local/writereview?placeid=ChIJ7aw4mO8FbUcRmAeyWnxejUs',
      reviewCount: 0,
      averageRating: 5,
    },
    {
      blockType: 'gallery',
      eyebrow: 'Galerie',
      headline: 'Das sind unsere tierischen Patienten',
      description:
        'Schau Dir unsere Galerie an! Du warst noch nicht bei uns? Dann fehlt genau Dein Haustier hier.',
      emptyStateText: 'Noch keine Bilder in der Galerie.',
    },
    {
      blockType: 'team',
      eyebrow: 'Über uns',
      headline: 'Unser Team',
      description: 'Mit Leidenschaft für Ihre Lieblinge',
    },
    {
      blockType: 'hours',
      eyebrow: 'Öffnungszeiten',
      headline: 'Wann wir für Sie da sind',
      description:
        'Flexible Öffnungszeiten für Sie und Ihre Lieblinge. Auch Hausbesuche sind nach Vereinbarung möglich.',
      openingHours: [
        { day: 'Montag', state: 'open', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Dienstag', state: 'open', times: '08:30 – 12:00 und 17:00 – 19:00' },
        { day: 'Mittwoch', state: 'open', times: '12:30 – 14:30 und 17:00 – 19:00' },
        { day: 'Donnerstag', state: 'open', times: '08:30 – 12:30 und 17:00 – 19:00' },
        { day: 'Freitag', state: 'open', times: '09:00 – 12:00 und 17:00 – 19:00' },
        { day: 'Samstag', state: 'reservation', times: 'Nach Vereinbarung' },
        { day: 'Sonntag', state: 'closed', times: 'Geschlossen' },
      ],
      emergency: {
        title: 'Notfälle außerhalb der Öffnungszeiten',
        description: 'Bei Notfällen rufen Sie uns bitte an. Wir sind für Sie erreichbar.',
      },
    },
    {
      blockType: 'contact',
      eyebrow: 'Kontakt',
      headline: 'Wir freuen uns auf Sie',
      description:
        'Ihr Liebling braucht Zuhause tierärztliche Betreuung? Ich bin nur einen Anruf entfernt.',
      address: {
        street: 'Brünnerstraße 219-221',
        city: '1210 Wien',
        additional: '1 TOP 60 (Einkaufszentrum B7)',
      },
      phone: '+43 699 190 12 012',
      email: 'contact@tierarztpraxis-lazri.at',
      consultationTimes: 'Mo–Fr: 09:00 – 12:00\nNachmittags nach Vereinbarung',
      directionsDescription:
        'Unsere Praxis befindet sich im Einkaufszentrum B7 an der Brünnerstraße. Parkmöglichkeiten sind direkt vor dem Eingang vorhanden.',
      directionsLinkLabel: 'In Google Maps öffnen',
    },
    {
      blockType: 'contactForm',
      eyebrow: 'Anfrage',
      headline: 'Schreiben Sie uns',
      description:
        'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir antworten innerhalb von 24 Stunden.',
    },
  ],
  footer: [
    {
      blockType: 'footer',
      tagline: 'Tierarztpraxis mit Leidenschaft für Ihre Lieblinge.',
      copyright: 'Mit Leidenschaft für Ihre Lieblinge.',
    },
  ],
  meta: {
    title: 'Tierarztpraxis Dr. Tune Lazri | Wien',
    description:
      'Tierarztpraxis Dr. Tune Lazri in Wien. Hausbesuche, Vorsorge, Diagnostik, Operationen. Mit Leidenschaft für Ihre Lieblinge.',
  },
} satisfies Omit<StartPage, 'id' | 'createdAt' | 'updatedAt'>

export async function seedStartPage(payload: Payload, overwrite = false): Promise<void> {
  const existing = await payload.findGlobal({ slug: 'start-page' })
  const hasLayout = Array.isArray(existing.layout) && existing.layout.length > 0

  if (hasLayout && !overwrite) {
    return
  }

  await payload.updateGlobal({
    slug: 'start-page',
    data: defaultStartPageData,
  })
}
