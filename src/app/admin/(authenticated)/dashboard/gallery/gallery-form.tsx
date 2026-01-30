'use client'

import { useState } from 'react'
import { createEvent, createImage } from '@/app/actions/gallery'
import { UploadButton } from '@/lib/uploadthing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { Loader2, Image as ImageIcon, X, FolderOpen } from 'lucide-react'
import Image from 'next/image'

type UploadMode = 'single' | 'event'

export function GalleryForm() {
    const [mode, setMode] = useState<UploadMode>('single')
    const [files, setFiles] = useState<{ url: string, name: string }[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        if (files.length === 0) {
            toast.error('Please upload at least one image')
            return
        }

        setIsSubmitting(true)
        try {
            if (mode === 'single') {
                await createImage({
                    title: formData.get('title') as string,
                    imageUrl: files[0].url,
                })
                toast.success('Image added to gallery')
            } else {
                await createEvent({
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    imageUrls: files.map(f => f.url),
                })
                toast.success('Event created with ' + files.length + ' images')
            }
            
            setFiles([])
            const form = document.getElementById('gallery-form') as HTMLFormElement
            form?.reset()
        } catch (error) {
            toast.error('Failed to upload')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Add to Gallery</h2>
            <form id="gallery-form" action={handleSubmit} className="space-y-6">
                {/* Upload Mode Selection */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Upload Type</Label>
                    <RadioGroup value={mode} onValueChange={(v) => {
                        setMode(v as UploadMode)
                        setFiles([])
                    }} className="grid grid-cols-2 gap-3">
                        <Label
                            htmlFor="single"
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                mode === 'single' 
                                    ? 'border-dreem-orange bg-orange-50 dark:bg-orange-950/20' 
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <RadioGroupItem value="single" id="single" />
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">Single Image</span>
                            </div>
                        </Label>
                        <Label
                            htmlFor="event"
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                mode === 'event' 
                                    ? 'border-dreem-orange bg-orange-50 dark:bg-orange-950/20' 
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <RadioGroupItem value="event" id="event" />
                            <div className="flex items-center gap-2">
                                <FolderOpen className="w-4 h-4" />
                                <span className="text-sm font-medium">Event/Folder</span>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                {/* Title Field */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                        {mode === 'single' ? 'Image Title' : 'Event Name'}
                    </Label>
                    <Input 
                        id="title" 
                        name="title" 
                        required 
                        placeholder={mode === 'single' ? 'e.g. Solar installation in Kitui' : 'e.g. DREEM Training - Nairobi 2024'} 
                        className="h-11"
                    />
                </div>

                {/* Description (only for events) */}
                {mode === 'event' && (
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Event Description (Optional)</Label>
                        <Textarea 
                            id="description" 
                            name="description" 
                            placeholder="Describe this event..." 
                            rows={3}
                        />
                    </div>
                )}

                {/* Upload Area */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">
                        {mode === 'single' ? 'Upload Image' : 'Upload Images'}
                        {mode === 'event' && <span className="text-xs text-muted-foreground ml-2">(First image will be the cover)</span>}
                    </Label>
                    
                    {files.length === 0 ? (
                        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:border-dreem-orange hover:bg-dreem-orange/5 transition-all cursor-pointer group min-h-[160px]">
                            <ImageIcon className="w-12 h-12 text-slate-400 group-hover:text-dreem-orange transition-colors mb-3" />
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                {mode === 'single' ? 'Click to upload image' : 'Click to select multiple images'}
                            </p>
                            <p className="text-xs text-slate-500">Max 4MB per image</p>
                            <UploadButton
                                endpoint="imageUploader"
                                content={{
                                    button: () => <></>,
                                    allowedContent: () => <></>
                                }}
                                onClientUploadComplete={(res) => {
                                    if (res && res.length > 0) {
                                        if (mode === 'single') {
                                            setFiles([{
                                                url: res[0].ufsUrl,
                                                name: res[0].name,
                                            }])
                                            toast.success('Image uploaded')
                                        } else {
                                            setFiles(res.map(r => ({
                                                url: r.ufsUrl,
                                                name: r.name,
                                            })))
                                            toast.success(`${res.length} images uploaded`)
                                        }
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`)
                                }}
                                appearance={{
                                    button: "w-full h-full absolute inset-0 opacity-0 cursor-pointer",
                                    container: "w-full h-full absolute inset-0"
                                }}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className={`grid gap-3 ${mode === 'event' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                {files.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                                            <Image
                                                src={file.url}
                                                alt={`Preview ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {mode === 'event' && index === 0 && (
                                                <div className="absolute top-2 left-2 bg-dreem-orange text-white text-xs font-bold px-2 py-1 rounded">
                                                    COVER
                                                </div>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {mode === 'event' && (
                                <div className="relative border-2 border-dashed border-dreem-orange/50 rounded-lg p-4 bg-dreem-orange/5 hover:border-dreem-orange hover:bg-dreem-orange/10 transition-all cursor-pointer group">
                                    <p className="text-sm font-medium text-center text-slate-600 dark:text-slate-400 mb-1">
                                        Click to add more images
                                    </p>
                                    <p className="text-xs text-center text-slate-500">Select multiple files from your device</p>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        content={{
                                            button: () => <></>,
                                            allowedContent: () => <></>
                                        }}
                                        onClientUploadComplete={(res) => {
                                            if (res && res.length > 0) {
                                                const newFiles = res.map(r => ({
                                                    url: r.ufsUrl,
                                                    name: r.name,
                                                }))
                                                setFiles([...files, ...newFiles])
                                                toast.success(`${res.length} more images added`)
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            toast.error(`Upload failed: ${error.message}`)
                                        }}
                                        appearance={{
                                            button: "w-full h-full absolute inset-0 opacity-0 cursor-pointer",
                                            container: "w-full h-full absolute inset-0"
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-11 bg-dreem-orange hover:bg-dreem-orange/90 text-white font-medium" 
                    disabled={isSubmitting || files.length === 0}
                >
                    {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        mode === 'single' ? 'Add to Gallery' : 'Create Event'
                    )}
                </Button>
            </form>
        </div>
    )
}
