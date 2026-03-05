import type { Payload } from 'payload'
import path from 'path'

const SEED_ALT_TEXT = 'Seed-Bild'

export async function seedMedia(payload: Payload, overwrite = false): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: SEED_ALT_TEXT } },
    limit: 1,
  })

  if (existing.docs.length > 0 && !overwrite) {
    return existing.docs[0].id
  }

  if (existing.docs.length > 0 && overwrite) {
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'media', id: doc.id })
    }
  }

  const filePath = path.resolve(process.cwd(), 'fixtures/images/dog.jpg')

  const media = await payload.create({
    collection: 'media',
    data: { alt: SEED_ALT_TEXT },
    filePath,
  })

  return media.id
}
