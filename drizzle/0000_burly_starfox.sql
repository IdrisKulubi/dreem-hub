CREATE TYPE "public"."category" AS ENUM('Report', 'Case Study', 'Policy', 'Manual', 'Other');--> statement-breakpoint
CREATE TYPE "public"."country" AS ENUM('Kenya', 'Uganda', 'Tanzania', 'Global');--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"country" "country" DEFAULT 'Global' NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" "category" DEFAULT 'Other' NOT NULL,
	"country" "country" DEFAULT 'Global' NOT NULL,
	"file_url" text NOT NULL,
	"file_size" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
