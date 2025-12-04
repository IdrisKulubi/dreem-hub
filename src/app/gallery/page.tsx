import { getImages } from '@/app/actions/gallery'
import { CountryFilter } from '@/components/ui/country-filter'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ country?: string }>
}) {
    const params = await searchParams
    const country = params.country || 'All'
    const images = await getImages(country)

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
            <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
                <RevealHeading className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                        Impact <span className="text-dreem-orange">Gallery</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Visualizing the transformation of agricultural value chains across the region.
                    </p>
                </RevealHeading>

                <CountryFilter />

                {images.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
                            <ImageIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No images found</h3>
                        <p className="text-muted-foreground mt-1">
                            Try selecting a different country or check back later.
                        </p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="group break-inside-avoid relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800"
                            >
                                <Image
                                    src={image.imageUrl}
                                    alt={image.title || 'Gallery image'}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-dreem-orange text-xs font-bold uppercase tracking-wider mb-1">
                                        {image.country}
                                    </span>
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {image.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
