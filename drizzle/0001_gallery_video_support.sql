CREATE TYPE "public"."media_type" AS ENUM('image', 'video');
ALTER TABLE "gallery_events" ADD COLUMN "cover_media_type" "media_type" DEFAULT 'image' NOT NULL;
ALTER TABLE "gallery_images" ADD COLUMN "media_type" "media_type" DEFAULT 'image' NOT NULL;
