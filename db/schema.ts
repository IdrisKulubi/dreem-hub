import { pgTable,  text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const countryEnum = pgEnum('country', ['Kenya', 'Uganda', 'Tanzania', 'Global']);
export const categoryEnum = pgEnum('category', ['Report', 'Case Study', 'Policy', 'Manual', 'Other']);

export const resources = pgTable('resources', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    category: categoryEnum('category').default('Other').notNull(),
    country: countryEnum('country').default('Global').notNull(),
    fileUrl: text('file_url').notNull(),
    fileSize: text('file_size'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const galleryImages = pgTable('gallery_images', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title'),
    country: countryEnum('country').default('Global').notNull(),
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
