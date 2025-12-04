'use client'

import { useState } from 'react'
import { createImage } from '@/app/actions/gallery'
import { UploadButton } from '@/lib/uploadthing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

export function GalleryForm() {
    const [file, setFile] = useState<{ url: string, name: string } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        if (!file) {
            toast.error('Please upload an image')
            return
        }

        setIsSubmitting(true)
        try {
            await createImage({
                title: formData.get('title') as string,
                imageUrl: file.url,
            })
            toast.success('Image added to gallery')
            setFile(null)
            const form = document.getElementById('gallery-form') as HTMLFormElement
            form?.reset()
        } catch (error) {
            toast.error('Failed to add image')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Add New Image</h2>
            <form id="gallery-form" action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title / Caption</Label>
                    <Input id="title" name="title" required placeholder="e.g. Solar installation in Kitui" />
                </div>

                <div className="space-y-2">
                    <Label>Image Upload</Label>
                    {!file ? (
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 flex justify-center">
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        setFile({
                                            url: res[0].url,
                                            name: res[0].name,
                                        })
                                        toast.success('Image uploaded')
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`)
                                }}
                            />
                        </div>
                    ) : (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                            <Image
                                src={file.url}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={() => setFile(null)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <Button type="submit" className="w-full bg-dreem-orange hover:bg-dreem-orange-dark text-white" disabled={isSubmitting || !file}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add to Gallery'}
                </Button>
            </form>
        </div>
    )
}
