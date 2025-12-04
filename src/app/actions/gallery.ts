'use server'


import { revalidatePath } from 'next/cache'
import { getSession } from './auth'
import { desc, eq } from 'drizzle-orm'
import db from '../../../db/drizzle'
import { galleryImages } from '../../../db/schema'

export async function createImage(data: {
    title: string
    imageUrl: string
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    const country = session as 'Kenya' | 'Uganda' | 'Tanzania' | 'Global'

    await db.insert(galleryImages).values({
        title: data.title,
        country: country,
        imageUrl: data.imageUrl,
    })

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

export async function getImages(country?: string) {
    if (country && country !== 'All') {
        return await db.query.galleryImages.findMany({
            where: eq(galleryImages.country, country as any),
            orderBy: [desc(galleryImages.createdAt)],
        })
    }

    return await db.query.galleryImages.findMany({
        orderBy: [desc(galleryImages.createdAt)],
    })
}

export async function deleteImage(id: string) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    await db.delete(galleryImages).where(eq(galleryImages.id, id))

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}
