'use server'


import { revalidatePath } from 'next/cache'
import { getSession } from './auth'
import { desc, eq } from 'drizzle-orm'
import db from '../../../db/drizzle'
import { galleryImages, galleryEvents } from '../../../db/schema'

type GalleryMediaType = 'image' | 'video'
type GalleryMediaInput = {
    url: string
    type: GalleryMediaType
    title?: string
}
const countries = ['Kenya', 'Uganda', 'Tanzania', 'Global'] as const
type GalleryCountry = typeof countries[number]

function isGalleryCountry(country: string): country is GalleryCountry {
    return countries.includes(country as GalleryCountry)
}

// Event actions
export async function createEvent(data: {
    title: string
    description?: string
    imageUrls?: string[]
    media?: GalleryMediaInput[]
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    const country = session as 'Kenya' | 'Uganda' | 'Tanzania' | 'Global'
    const media: GalleryMediaInput[] =
        data.media ?? data.imageUrls?.map((url) => ({ url, type: 'image' as const })) ?? []

    if (media.length === 0) throw new Error('At least one media item is required')

    const [event] = await db.insert(galleryEvents).values({
        title: data.title,
        description: data.description,
        country: country,
        coverImageUrl: media[0].url, // First media item is the cover
        coverMediaType: media[0].type,
    }).returning()

    // Insert all media linked to this event
    await db.insert(galleryImages).values(
        media.map((item) => ({
            eventId: event.id,
            imageUrl: item.url,
            mediaType: item.type,
            title: item.title,
            country: country,
        }))
    )

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard/gallery')
}

export async function getEvents(country?: string) {
    if (country && country !== 'All' && isGalleryCountry(country)) {
        return await db.query.galleryEvents.findMany({
            where: eq(galleryEvents.country, country),
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
    mediaType?: GalleryMediaType
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    // Create a single-media event
    await createEvent({
        title: data.title,
        media: [{ url: data.imageUrl, type: data.mediaType ?? 'image', title: data.title }],
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
