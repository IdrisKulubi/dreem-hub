# Image Optimization Guide for DREEM Hub

## Overview

This guide explains how to properly handle images in the DREEM Hub website to ensure optimal performance, especially for users in East Africa with limited bandwidth.

## Image Storage Strategy

### Current Setup (Landing Page)
- **Static Assets**: SVG patterns and icons stored in `/public` folder
- **No Images Yet**: The landing page currently uses emojis and SVG graphics

### Future Setup (When Adding Images)
- **UploadThing**: For user-uploaded content (team photos, gallery images)
- **Public Folder**: For static brand assets (logos, icons)
- **Next.js Image Component**: For all image rendering

## Using Next.js Image Component

### Why Next.js Image?
- Automatic image optimization (WebP/AVIF conversion)
- Lazy loading by default
- Responsive image sizing
- Prevents Cumulative Layout Shift (CLS)
- Optimized for Core Web Vitals

### Basic Usage

```tsx
import Image from 'next/image'

// Static image with fixed dimensions
<Image
  src="/logo.png"
  width={200}
  height={100}
  alt="DREEM Hub logo"
/>

// Responsive image with fill
<div className="relative w-full h-64">
  <Image
    src="/hero-image.jpg"
    fill
    className="object-cover"
    alt="Solar panels in agricultural setting"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

## Image Optimization Checklist

### Before Adding Images

- [ ] Compress images using tools like:
  - [TinyPNG](https://tinypng.com/) for PNG/JPEG
  - [Squoosh](https://squoosh.app/) for advanced compression
  - [ImageOptim](https://imageoptim.com/) for batch processing

- [ ] Choose appropriate formats:
  - **WebP**: Best for photos (Next.js converts automatically)
  - **SVG**: Best for logos, icons, illustrations
  - **PNG**: For images requiring transparency
  - **JPEG**: For photos without transparency

- [ ] Resize images to appropriate dimensions:
  - Hero images: 1920x1080px max
  - Card images: 800x600px max
  - Thumbnails: 300x300px max
  - Team photos: 400x400px max

### When Adding Images to Code

- [ ] Use Next.js `Image` component (not `<img>` tag)
- [ ] Provide descriptive `alt` text for accessibility
- [ ] Set appropriate `width` and `height` or use `fill`
- [ ] Add `sizes` prop for responsive images
- [ ] Use `priority` for above-the-fold images
- [ ] Add `placeholder="blur"` for better UX

### Example: Team Member Photo

```tsx
import Image from 'next/image'
import { IMAGE_SIZES, generateAltText } from '@/lib/image-utils'

export function TeamMemberCard({ member }) {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={member.photoUrl} // UploadThing URL
        fill
        className="object-cover rounded-full"
        sizes={IMAGE_SIZES.card}
        alt={generateAltText({
          type: 'team',
          name: member.name,
          description: member.role
        })}
      />
    </div>
  )
}
```

## UploadThing Integration

### Setup (When Needed)

1. Install UploadThing:
```bash
pnpm add uploadthing @uploadthing/react
```

2. Configure environment variables in `.env.local`:
```env
UPLOADTHING_SECRET=your_secret_key
UPLOADTHING_APP_ID=your_app_id
```

3. Create upload endpoint:
```tsx
// src/app/api/uploadthing/core.ts
import { createUploadthing } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url)
    }),
}
```

### Using UploadThing Images

UploadThing automatically:
- Optimizes images
- Serves via CDN
- Provides responsive URLs

```tsx
// Image from UploadThing
<Image
  src="https://uploadthing.com/f/abc123.jpg"
  width={800}
  height={600}
  alt="Description"
/>
```

## Open Graph Image

The site requires an Open Graph image for social media sharing:

### Requirements
- **Dimensions**: 1200x630px
- **Format**: JPEG or PNG
- **File size**: < 1MB
- **Location**: `/public/og-image.jpg`

### Content Suggestions
- DREEM Hub logo
- Tagline: "Solarizing Agricultural Value Chains Across East Africa"
- Visual elements: Solar panels, agricultural imagery, country flags
- Brand colors: Orange (#E97451), Blue (#00ADDD), Green (#80C738)

### Creating the OG Image

You can create this using:
- Canva (use 1200x630px template)
- Figma
- Photoshop
- Online OG image generators

## Performance Targets

### Lighthouse Scores (Target: 90+)
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Image-Specific Metrics
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.8s

## Testing Images

### Local Testing
```bash
pnpm run build
pnpm run start
```

### Check Image Optimization
1. Open DevTools > Network tab
2. Filter by "Img"
3. Verify images are served as WebP/AVIF
4. Check image sizes are appropriate

### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

## Common Issues & Solutions

### Issue: Images not loading
- **Solution**: Check file path is correct (relative to `/public`)
- **Solution**: Verify UploadThing URLs are accessible

### Issue: Layout shift when images load
- **Solution**: Always provide `width` and `height` or use `fill` with container dimensions

### Issue: Images too large
- **Solution**: Compress before uploading
- **Solution**: Use appropriate `sizes` prop

### Issue: Slow loading on mobile
- **Solution**: Use responsive images with `sizes` prop
- **Solution**: Implement lazy loading (default in Next.js Image)

## Resources

- [Next.js Image Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [UploadThing Documentation](https://docs.uploadthing.com/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Squoosh Image Compressor](https://squoosh.app/)
