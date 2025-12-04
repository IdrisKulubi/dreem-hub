'use client'

import { useState } from 'react'
import { createResource } from '@/app/actions/resources'
import { UploadButton } from '@/lib/uploadthing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, FileText, X } from 'lucide-react'

export function ResourceForm() {
    const [file, setFile] = useState<{ url: string, name: string, size: number } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        if (!file) {
            toast.error('Please upload a PDF file')
            return
        }

        setIsSubmitting(true)
        try {
            await createResource({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as any,
                fileUrl: file.url,
                fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            })
            toast.success('Resource created successfully')
            setFile(null)
            // Reset form (optional, or use key to force re-render)
            const form = document.getElementById('resource-form') as HTMLFormElement
            form?.reset()
        } catch (error) {
            toast.error('Failed to create resource')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Add New Resource</h2>
            <form id="resource-form" action={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" required placeholder="e.g. Annual Report 2024" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required defaultValue="Report">
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
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
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Brief description of the resource..." />
                </div>

                <div className="space-y-2">
                    <Label>File Upload (PDF)</Label>
                    {!file ? (
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-6 flex justify-center">
                            <UploadButton
                                endpoint="resourceUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        setFile({
                                            url: res[0].url,
                                            name: res[0].name,
                                            size: res[0].size,
                                        })
                                        toast.success('File uploaded')
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`)
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-dreem-orange" />
                                <div className="text-sm">
                                    <div className="font-medium truncate max-w-[200px]">{file.name}</div>
                                    <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <Button type="submit" className="w-full bg-dreem-orange hover:bg-dreem-orange-dark text-white" disabled={isSubmitting || !file}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Resource'}
                </Button>
            </form>
        </div>
    )
}
