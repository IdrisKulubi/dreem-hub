import { getSession } from '@/app/actions/auth'
import { getImages, deleteImage } from '@/app/actions/gallery'
import { GalleryForm } from './gallery-form'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

export default async function GalleryPage() {
    const session = await getSession()
    const images = await getImages(session)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gallery Manager</h1>
                <p className="text-muted-foreground">
                    Upload and manage photos for {session}.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <GalleryForm />
                </div>

                {/* Right Column: Grid */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold">Existing Images</h2>
                    {images.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-xl text-muted-foreground">
                            No images found. Upload your first one!
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {images.map((image) => (
                                <div key={image.id} className="group relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.title || 'Gallery image'}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <p className="text-white text-xs font-medium truncate mb-2">{image.title}</p>
                                        <form action={async () => {
                                            'use server'
                                            await deleteImage(image.id)
                                        }}>
                                            <Button variant="destructive" size="sm" className="w-full h-8 text-xs">
                                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
