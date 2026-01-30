'use server'


import { revalidatePath } from 'next/cache'
import { getSession } from './auth'
import { desc, eq } from 'drizzle-orm'
import db from '../../../db/drizzle'
import { galleryImages, galleryEvents } from '../../../db/schema'

// Event actions
export async function createEvent(data: {
    title: string
    description?: string
    imageUrls: string[]
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    const country = session as 'Kenya' | 'Uganda' | 'Tanzania' | 'Global'

    if (data.imageUrls.length === 0) throw new Error('At least one image is required')

    const [event] = await db.insert(galleryEvents).values({
        title: data.title,
        description: data.description,
        country: country,
        coverImageUrl: data.imageUrls[0], // First image is the cover
    }).returning()

    // Insert all images linked to this event
    await db.insert(galleryImages).values(
        data.imageUrls.map((url) => ({
            eventId: event.id,
            imageUrl: url,
            country: country,
        }))
    )

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

export async function getEvents(country?: string) {
    if (country && country !== 'All') {
        return await db.query.galleryEvents.findMany({
            where: eq(galleryEvents.country, country as any),
            orderBy: [desc(galleryEvents.createdAt)],
            with: {
                images: true,
            },
        })
    }

    return await db.query.galleryEvents.findMany({
        orderBy: [desc(galleryEvents.createdAt)],
        with: {
            images: true,
        },
    })
}

export async function deleteEvent(id: string) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    await db.delete(galleryEvents).where(eq(galleryEvents.id, id))

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

export async function updateEvent(id: string, data: {
    title: string
    description?: string
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    await db.update(galleryEvents)
        .set({
            title: data.title,
            description: data.description,
            updatedAt: new Date(),
        })
        .where(eq(galleryEvents.id, id))

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

// Single image actions (for standalone images without events)
export async function createImage(data: {
    title: string
    imageUrl: string
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    const country = session as 'Kenya' | 'Uganda' | 'Tanzania' | 'Global'

    // Create a single-image event
    await createEvent({
        title: data.title,
        imageUrls: [data.imageUrl],
    })

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

export async function getImages(country?: string) {
    // Legacy function - now returns events
    return await getEvents(country)
}

export async function deleteImage(id: string) {
    // This now deletes an event
    await deleteEvent(id)
}
