import { getEvents } from '@/app/actions/gallery'
import { CountryFilter } from '@/components/ui/country-filter'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Image as ImageIcon, Images } from 'lucide-react'
import Image from 'next/image'

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ country?: string }>
}) {
    const params = await searchParams
    const country = params.country || 'All'
    const events = await getEvents(country)

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

                {events.length === 0 ? (
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <Dialog key={event.id}>
                                <DialogTrigger asChild>
                                    <div className="group relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <Image
                                                src={event.coverImageUrl}
                                                alt={event.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                unoptimized
                                            />
                                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                                <Images className="w-3.5 h-3.5" />
                                                <span>{event.images?.length || 0}</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-dreem-orange uppercase tracking-wider">
                                                    {event.country}
                                                </span>
                                                <span className="text-xs text-slate-400">•</span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(event.createdAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-dreem-orange transition-colors">
                                                {event.title}
                                            </h3>
                                            {event.description && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto">
                                    <DialogHeader className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-dreem-orange uppercase tracking-wider bg-dreem-orange/10 px-2 py-1 rounded">
                                                {event.country}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {new Date(event.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'long', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </span>
                                        </div>
                                        <DialogTitle className="text-2xl md:text-3xl font-bold">{event.title}</DialogTitle>
                                        {event.description && (
                                            <p className="text-slate-600 dark:text-slate-400 text-base">
                                                {event.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Images className="w-4 h-4" />
                                            <span>{event.images?.length || 0} photos in this collection</span>
                                        </div>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                        {event.images?.map((image, index) => (
                                            <div 
                                                key={image.id} 
                                                className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 group border border-slate-200 dark:border-slate-700"
                                            >
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={image.title || `${event.title} - Photo ${index + 1}`}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    unoptimized
                                                />
                                                {image.title && (
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <p className="text-white text-xs font-medium">{image.title}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
