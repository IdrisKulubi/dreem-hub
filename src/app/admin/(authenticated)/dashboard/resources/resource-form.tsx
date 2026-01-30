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
import { Loader2, FileText, X, Upload } from 'lucide-react'

export function ResourceForm() {
    const [file, setFile] = useState<{ url: string, name: string, size: number } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [category, setCategory] = useState('Report')

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
                category: category as any,
                fileUrl: file.url,
                fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            })
            toast.success('Resource published successfully')
            setFile(null)
            const form = document.getElementById('resource-form') as HTMLFormElement
            form?.reset()
            setCategory('Report')
        } catch (error) {
            toast.error('Failed to create resource')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Add New Resource</h2>
            <form id="resource-form" action={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                    <Input 
                        id="title" 
                        name="title" 
                        required 
                        placeholder="e.g. Annual Report 2024" 
                        className="h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-11">
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
                    <Label htmlFor="description" className="text-sm font-medium">
                        Description <span className="text-xs text-slate-500">(Optional)</span>
                    </Label>
                    <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Brief description of the resource..." 
                        rows={4}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium">File Upload (PDF)</Label>
                    {!file ? (
                        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:border-dreem-orange hover:bg-dreem-orange/5 transition-all cursor-pointer group min-h-[160px]">
                            <Upload className="w-12 h-12 text-slate-400 group-hover:text-dreem-orange transition-colors mb-3" />
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1 font-medium">Click to upload PDF</p>
                            <p className="text-xs text-slate-500">Max file size: 16MB</p>
                            <UploadButton
                                endpoint="resourceUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        setFile({
                                            url: res[0].ufsUrl,
                                            name: res[0].name,
                                            size: res[0].size,
                                        })
                                        toast.success('File uploaded')
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`)
                                }}
                                appearance={{
                                    button: "w-full h-full absolute inset-0 opacity-0 cursor-pointer",
                                    container: "w-full h-full absolute inset-0",
                                    allowedContent: "hidden"
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-dreem-orange/5 dark:bg-dreem-orange/10 rounded-lg border-2 border-dreem-orange/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-dreem-orange/20 rounded-lg">
                                    <FileText className="w-5 h-5 text-dreem-orange" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-slate-900 dark:text-white truncate max-w-[180px]">
                                        {file.name}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setFile(null)}
                                className="h-8 w-8"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-11 bg-dreem-orange hover:bg-dreem-orange/90 text-white font-medium" 
                    disabled={isSubmitting || !file}
                >
                    {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        'Publish Resource'
                    )}
                </Button>
            </form>
        </div>
    )
}
