'use client'

import { useState } from 'react'
import { deleteResource, updateResource } from '@/app/actions/resources'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, FileText, Download, Edit, AlertTriangle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

type Resource = {
    id: string
    title: string
    description: string | null
    category: string
    country: string
    fileUrl: string
    fileSize: string | null
    createdAt: Date
}

export function ResourceCard({ resource }: { resource: Resource }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [category, setCategory] = useState(resource.category)

    async function handleDelete() {
        setIsDeleting(true)
        try {
            await deleteResource(resource.id)
            toast.success('Resource deleted')
            setIsDeleteOpen(false)
        } catch (error) {
            toast.error('Failed to delete resource')
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleUpdate(formData: FormData) {
        try {
            await updateResource(resource.id, {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: category as any,
            })
            toast.success('Resource updated')
            setIsEditOpen(false)
        } catch (error) {
            toast.error('Failed to update resource')
        }
    }

    return (
        <div className="flex items-start justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4 flex-1 min-w-0">
                <div className="p-3 bg-dreem-orange/10 rounded-lg h-fit">
                    <FileText className="w-6 h-6 text-dreem-orange" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                        {resource.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full font-medium">
                            {resource.category}
                        </span>
                        <span>•</span>
                        <span>{format(new Date(resource.createdAt), 'MMM d, yyyy')}</span>
                        {resource.fileSize && (
                            <>
                                <span>•</span>
                                <span>{resource.fileSize}</span>
                            </>
                        )}
                    </div>
                    {resource.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2">
                            {resource.description}
                        </p>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                        <Download className="w-4 h-4" />
                    </Button>
                </a>
                
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <Edit className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Resource</DialogTitle>
                        </DialogHeader>
                        <form action={handleUpdate} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input 
                                    id="edit-title" 
                                    name="title" 
                                    defaultValue={resource.title} 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Report">Report</SelectItem>
                                        <SelectItem value="Case Study">Case Study</SelectItem>
                                        <SelectItem value="Policy">Policy</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea 
                                    id="edit-description" 
                                    name="description" 
                                    defaultValue={resource.description || ''} 
                                    rows={4}
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
                            size="icon"
                            className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
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
                                    <DialogTitle className="text-xl">Delete Resource</DialogTitle>
                                    <DialogDescription className="text-sm mt-1">
                                        This action cannot be undone
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">"{resource.title}"</span>?
                            </p>
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <div className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium mb-1">This will permanently delete:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-xs">
                                            <li>The resource "{resource.title}"</li>
                                            <li>Category: {resource.category}</li>
                                            <li>File ({resource.fileSize || 'Unknown size'})</li>
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
                                        Delete Resource
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
