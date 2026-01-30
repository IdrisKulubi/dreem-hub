'use client'

import { useState } from 'react'
import { deleteEvent, updateEvent } from '@/app/actions/gallery'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Edit, Images, Eye, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { format } from 'date-fns'

type Event = {
    id: string
    title: string
    description: string | null
    country: string
    coverImageUrl: string
    createdAt: Date
    updatedAt: Date
    images: Array<{
        id: string
        imageUrl: string
        title: string | null
    }>
}

export function GalleryEventCard({ event }: { event: Event }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        setIsDeleting(true)
        try {
            await deleteEvent(event.id)
            toast.success('Event deleted')
            setIsDeleteOpen(false)
        } catch (error) {
            toast.error('Failed to delete event')
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleUpdate(formData: FormData) {
        try {
            await updateEvent(event.id, {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
            })
            toast.success('Event updated')
            setIsEditOpen(false)
        } catch (error) {
            toast.error('Failed to update event')
        }
    }

    return (
        <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                {/* Cover Image */}
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={event.coverImageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                        <Images className="w-3 h-3" />
                        {event.images?.length || 0}
                    </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                            {event.title}
                        </h3>
                        {event.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                {event.description}
                            </p>
                        )}
                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                {event.country}
                            </span>
                            <span>•</span>
                            <span>{format(new Date(event.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View All
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{event.title}</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {event.images?.map((image) => (
                                        <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.title || 'Event image'}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Event</DialogTitle>
                                </DialogHeader>
                                <form action={handleUpdate} className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-title">Title</Label>
                                        <Input id="edit-title" name="title" defaultValue={event.title} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea 
                                            id="edit-description" 
                                            name="description" 
                                            defaultValue={event.description || ''} 
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="submit" className="flex-1 bg-dreem-orange hover:bg-dreem-orange/90">
                                            Save Changes
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30">
                                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
                                        </div>
                                        <div>
                                            <DialogTitle className="text-xl">Delete Event</DialogTitle>
                                            <DialogDescription className="text-sm mt-1">
                                                This action cannot be undone
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogHeader>
                                <div className="py-4">
                                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                                        Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">"{event.title}"</span>?
                                    </p>
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                        <div className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium mb-1">This will permanently delete:</p>
                                                <ul className="list-disc list-inside space-y-0.5 text-xs">
                                                    <li>The event "{event.title}"</li>
                                                    <li>All {event.images?.length || 0} images in this event</li>
                                                    <li>All associated metadata</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter className="flex-row gap-2 sm:gap-2">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setIsDeleteOpen(false)}
                                        disabled={isDeleting}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 bg-red-600 hover:bg-red-700"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete Event
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
