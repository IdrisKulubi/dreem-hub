'use server'


import { revalidatePath } from 'next/cache'
import { getSession } from './auth'
import { desc, eq } from 'drizzle-orm'
import { resources } from '../../../db/schema'
import db from '../../../db/drizzle'

export async function createResource(data: {
    title: string
    description: string
    category: 'Report' | 'Case Study' | 'Policy' | 'Manual' | 'Other'
    fileUrl: string
    fileSize: string
}) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    // If session is Global, we might want to allow selecting country, 
    // but for now let's default to the session country or Global if Super Admin
    // Actually, the requirement says "choose country" is for the admin code logic.
    // If I am logged in as Kenya, I upload for Kenya.
    // If I am logged in as Global (Super), I should probably be able to choose, 
    // but for simplicity let's just say Global uploads are Global or we add a field later.
    // For now, use session country.

    const country = session as 'Kenya' | 'Uganda' | 'Tanzania' | 'Global'

    await db.insert(resources).values({
        title: data.title,
        description: data.description,
        category: data.category,
        country: country,
        fileUrl: data.fileUrl,
        fileSize: data.fileSize,
    })

    revalidatePath('/knowledge-hub')
    revalidatePath('/admin/dashboard/resources')
}

export async function getResources(country?: string) {
    if (country && country !== 'All') {
        return await db.query.resources.findMany({
            where: eq(resources.country, country as any),
            orderBy: [desc(resources.createdAt)],
        })
    }

    return await db.query.resources.findMany({
        orderBy: [desc(resources.createdAt)],
    })
}

export async function deleteResource(id: string) {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    await db.delete(resources).where(eq(resources.id, id))

    revalidatePath('/knowledge-hub')
    revalidatePath('/admin/dashboard/resources')
}
