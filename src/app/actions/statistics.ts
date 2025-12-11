'use server'

import { getSession } from './auth'
import { desc, sql, count, eq } from 'drizzle-orm'
import db from '../../../db/drizzle'
import { resources, galleryImages } from '../../../db/schema'

export async function getStatistics() {
    const session = await getSession()
    if (!session) throw new Error('Unauthorized')

    // 1. Total Counts
    const [resourcesCount, galleryCount] = await Promise.all([
        db.select({ count: count() }).from(resources),
        db.select({ count: count() }).from(galleryImages)
    ])

    // 2. Resources by Category (Specific to resources only)
    const resourcesByCategory = await db
        .select({
            name: resources.category,
            value: count(),
        })
        .from(resources)
        .groupBy(resources.category)

    // 3. By Country (Resources + Gallery)
    const [resByCountry, galByCountry] = await Promise.all([
        db
            .select({
                name: resources.country,
                value: count(),
            })
            .from(resources)
            .groupBy(resources.country),
        db
            .select({
                name: galleryImages.country,
                value: count(),
            })
            .from(galleryImages)
            .groupBy(galleryImages.country)
    ])

    // Merge country data
    const combinedCountryParams: Record<string, number> = {}

    // Initialize with all possible countries to ensure clean data
    const allCountries = ['Kenya', 'Uganda', 'Tanzania', 'Global']
    allCountries.forEach(c => combinedCountryParams[c] = 0)

    resByCountry.forEach(item => {
        if (item.name) combinedCountryParams[item.name] = (combinedCountryParams[item.name] || 0) + item.value
    })
    galByCountry.forEach(item => {
        if (item.name) combinedCountryParams[item.name] = (combinedCountryParams[item.name] || 0) + item.value
    })

    const combinedByCountry = Object.entries(combinedCountryParams)
        .map(([name, value]) => ({ name, value }))
        .filter(item => item.value > 0) // Only show active countries

    // 4. Activity Over Time (Resources + Gallery)
    // Fetch raw grouped data for both tables
    const [resActivity, galActivity] = await Promise.all([
        db.execute(sql`
            SELECT 
                TO_CHAR(created_at, 'Mon') as name,
                DATE_TRUNC('month', created_at) as date,
                COUNT(*) as value
            FROM ${resources}
            WHERE created_at >= NOW() - INTERVAL '6 months'
            GROUP BY 1, 2
            ORDER BY 2 ASC
        `),
        db.execute(sql`
            SELECT 
                TO_CHAR(created_at, 'Mon') as name,
                DATE_TRUNC('month', created_at) as date,
                COUNT(*) as value
            FROM ${galleryImages}
            WHERE created_at >= NOW() - INTERVAL '6 months'
            GROUP BY 1, 2
            ORDER BY 2 ASC
        `)
    ])

    // Merge activity data
    const activityMap = new Map<string, { name: string, date: number, value: number }>()

    const processActivity = (rows: Record<string, any>[]) => {
        rows.forEach((row: any) => {
            const key = row.name // Month name e.g., "Dec"
            const dateVal = new Date(row.date).getTime()
            const countVal = Number(row.value)

            if (activityMap.has(key)) {
                const existing = activityMap.get(key)!
                existing.value += countVal
            } else {
                activityMap.set(key, { name: key, date: dateVal, value: countVal })
            }
        })
    }

    processActivity(resActivity.rows)
    processActivity(galActivity.rows)

    const combinedActivity = Array.from(activityMap.values())
        .sort((a, b) => a.date - b.date)

    // 5. System Health Checks
    let dbStatus = 'Unknown'
    let lastActivity = null

    try {
        // Check DB connection
        await db.execute(sql`SELECT 1`)
        dbStatus = 'Connected'

        // Get last activity
        const [lastResource, lastImage] = await Promise.all([
            db.query.resources.findFirst({ orderBy: [desc(resources.createdAt)] }),
            db.query.galleryImages.findFirst({ orderBy: [desc(galleryImages.createdAt)] })
        ])

        const lastResourceDate = lastResource?.createdAt ? new Date(lastResource.createdAt) : new Date(0);
        const lastImageDate = lastImage?.createdAt ? new Date(lastImage.createdAt) : new Date(0);

        lastActivity = lastResourceDate > lastImageDate ? lastResourceDate : lastImageDate;

    } catch (error) {
        dbStatus = 'Error'
        console.error('Database health check failed:', error)
    }

    return {
        counts: {
            resources: resourcesCount[0].count,
            gallery: galleryCount[0].count,
            totalUploads: resourcesCount[0].count + galleryCount[0].count
        },
        charts: {
            byCategory: resourcesByCategory,
            byCountry: combinedByCountry,
            activity: combinedActivity,
        },
        health: {
            database: dbStatus,
            lastActivity: lastActivity,
            version: process.version,
            status: 'Operational'
        }
    }
}
