import type { Payload } from 'payload'

const teamMembersData = [
  {
    name: 'Dr. Tune Lazri',
    slug: 'dr-tune-lazri',
    role: 'Tierärztin & Praxisinhaberin',
    description:
      'Dipl. Tierärztin mit über 15 Jahren Erfahrung in der Kleintiermedizin. Spezialisiert auf Chiropraktik und alternative Schmerztherapie.',
    sortOrder: 0,
    isActive: true,
    memberPageLayout: [
      {
        blockType: 'memberHero' as const,
        variant: 'editorial' as const,
        eyebrow: 'Team',
        headline: 'Für Tiere da. Mit Haltung.',
        subheadline: 'Persönlich, präzise und mit ruhiger Hand.',
        description:
          'Ein klarer Blick, viel Erfahrung und ehrliche Kommunikation: so begleite ich Sie und Ihr Tier durch jede Lebensphase.',
        ctaLabel: 'Termin vereinbaren',
        ctaHref: '/#kontakt',
      },
      {
        blockType: 'memberCv' as const,
        eyebrow: 'Werdegang',
        headline: 'Curriculum Vitae',
        entries: [
          {
            period: '2008–Heute',
            title: 'Praxisinhaberin',
            institution: 'Tierarztpraxis Tune Lazri, Wien',
            description: 'Ambulante und stationäre Versorgung mit Fokus auf Kleintiere.',
          },
          {
            period: '2002–2008',
            title: 'Studium der Veterinärmedizin',
            institution: 'Veterinärmedizinische Universität Wien',
          },
        ],
      },
    ],
  },
  {
    name: 'Maria Mustermann',
    slug: 'maria-mustermann',
    role: 'Tiermedizinische Fachangestellte',
    description:
      'Erfahrene Fachangestellte mit einem besonderen Gespür für ängstliche Tiere. Zuständig für Praxisorganisation und Labordiagnostik.',
    sortOrder: 1,
    isActive: true,
    memberPageLayout: [
      {
        blockType: 'memberHero' as const,
        variant: 'editorial' as const,
        eyebrow: 'Team',
        headline: 'Mit Herz und Verstand.',
        subheadline: 'Jedes Tier verdient eine sanfte Hand.',
        description:
          'Von der Anmeldung bis zur Nachsorge — ich bin für Sie und Ihr Tier da und sorge dafür, dass sich alle wohlfühlen.',
        ctaLabel: 'Termin vereinbaren',
        ctaHref: '/#kontakt',
      },
      {
        blockType: 'memberCv' as const,
        eyebrow: 'Werdegang',
        headline: 'Curriculum Vitae',
        entries: [
          {
            period: '2015–Heute',
            title: 'Tiermedizinische Fachangestellte',
            institution: 'Tierarztpraxis Tune Lazri, Wien',
            description: 'Praxisorganisation, Labordiagnostik und Patientenbetreuung.',
          },
          {
            period: '2012–2015',
            title: 'Ausbildung zur TFA',
            institution: 'Tierklinik Donaustadt, Wien',
          },
        ],
      },
    ],
  },
]

export async function seedTeamMembers(
  payload: Payload,
  mediaId: number,
  overwrite = false,
): Promise<void> {
  const existing = await payload.find({
    collection: 'team-members',
    limit: 1,
  })

  if (existing.docs.length > 0 && !overwrite) {
    return
  }

  if (overwrite) {
    const all = await payload.find({ collection: 'team-members', limit: 100 })
    for (const doc of all.docs) {
      await payload.delete({ collection: 'team-members', id: doc.id })
    }
  }

  for (const member of teamMembersData) {
    await payload.create({
      collection: 'team-members',
      data: {
        ...member,
        photos: [mediaId],
      },
    })
  }
}
