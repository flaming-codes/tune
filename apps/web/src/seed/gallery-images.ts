import type { Payload } from 'payload'

const galleryImagesData = [
  {
    title: 'Glücklicher Patient',
    sortOrder: 0,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'In der Praxis',
    sortOrder: 1,
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Untersuchung',
    sortOrder: 2,
    isFeatured: false,
    isActive: true,
  },
]

export async function seedGalleryImages(
  payload: Payload,
  mediaId: number,
  overwrite = false,
): Promise<void> {
  const existing = await payload.find({
    collection: 'gallery-images',
    limit: 1,
  })

  if (existing.docs.length > 0 && !overwrite) {
    return
  }

  if (overwrite) {
    const all = await payload.find({ collection: 'gallery-images', limit: 100 })
    for (const doc of all.docs) {
      await payload.delete({ collection: 'gallery-images', id: doc.id })
    }
  }

  for (const item of galleryImagesData) {
    await payload.create({
      collection: 'gallery-images',
      data: {
        ...item,
        image: mediaId,
      },
    })
  }
}
