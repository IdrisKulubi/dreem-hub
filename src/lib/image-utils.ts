/**
 * Image Optimization Utilities for DREEM Hub
 * 
 * This file provides utilities for optimizing images throughout the application.
 * All images should use Next.js Image component for automatic optimization.
 */

/**
 * UploadThing configuration for image uploads
 * Images uploaded through UploadThing are automatically optimized and served via CDN
 */
export const UPLOADTHING_CONFIG = {
  maxFileSize: '4MB',
  acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
  // UploadThing automatically converts images to WebP format for optimal performance
}

/**
 * Image size presets for responsive images
 * Use these with Next.js Image component's sizes prop
 */
export const IMAGE_SIZES = {
  thumbnail: '(max-width: 640px) 150px, 200px',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  hero: '100vw',
  full: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
}

/**
 * Default blur data URL for loading states
 * This provides a better UX while images load
 */
export const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=='

/**
 * Generate alt text for images
 * Ensures all images have descriptive alt text for accessibility
 */
export function generateAltText(context: {
  type: 'team' | 'gallery' | 'partner' | 'country'
  name: string
  description?: string
}): string {
  const { type, name, description } = context

  switch (type) {
    case 'team':
      return `Photo of ${name}, ${description || 'DREEM Hub team member'}`
    case 'gallery':
      return description || `DREEM Hub ${name}`
    case 'partner':
      return `${name} logo - DREEM Hub partner`
    case 'country':
      return `${name} program - ${description || 'DREEM Hub initiative'}`
    default:
      return name
  }
}

/**
 * Image optimization guidelines:
 * 
 * 1. Always use Next.js Image component for images:
 *    import Image from 'next/image'
 * 
 * 2. Provide width and height for static images:
 *    <Image src="/image.jpg" width={800} height={600} alt="Description" />
 * 
 * 3. Use fill for responsive containers:
 *    <div className="relative w-full h-64">
 *      <Image src="/image.jpg" fill className="object-cover" alt="Description" />
 *    </div>
 * 
 * 4. Always provide descriptive alt text:
 *    - Use generateAltText() helper for consistency
 *    - Never use empty alt text unless image is purely decorative
 * 
 * 5. Use placeholder="blur" for better UX:
 *    <Image src="/image.jpg" placeholder="blur" blurDataURL={DEFAULT_BLUR_DATA_URL} />
 * 
 * 6. Optimize image sizes:
 *    - Use appropriate sizes prop for responsive images
 *    - Leverage IMAGE_SIZES constants
 * 
 * 7. For UploadThing images:
 *    - Images are automatically optimized and served via CDN
 *    - Use the full UploadThing URL as src
 *    - Next.js will still optimize these images
 * 
 * Example usage:
 * 
 * ```tsx
 * import Image from 'next/image'
 * import { IMAGE_SIZES, generateAltText } from '@/lib/image-utils'
 * 
 * export function TeamMemberCard({ member }) {
 *   return (
 *     <div className="relative w-full h-64">
 *       <Image
 *         src={member.photo}
 *         fill
 *         className="object-cover rounded-lg"
 *         sizes={IMAGE_SIZES.card}
 *         alt={generateAltText({ 
 *           type: 'team', 
 *           name: member.name, 
 *           description: member.role 
 *         })}
 *         priority={false}
 *       />
 *     </div>
 *   )
 * }
 * ```
 */
