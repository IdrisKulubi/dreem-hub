import { getSession } from '@/app/actions/auth'
import { getResources, deleteResource } from '@/app/actions/resources'
import { ResourceForm } from './resource-form'
import { Button } from '@/components/ui/button'
import { Trash2, FileText, Download } from 'lucide-react'
import { format } from 'date-fns'

export default async function ResourcesPage() {
    const session = await getSession()
    const resources = await getResources(session) // Fetch resources for this country

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Knowledge Hub</h1>
                <p className="text-muted-foreground">
                    Manage resources for {session}. Upload reports, policies, and manuals.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <ResourceForm />
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold">Existing Resources</h2>
                    {resources.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-xl text-muted-foreground">
                            No resources found. Upload your first one!
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {resources.map((resource) => (
                                <div key={resource.id} className="flex items-start justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg h-fit">
                                            <FileText className="w-6 h-6 text-slate-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{resource.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{resource.category}</span>
                                                <span>•</span>
                                                <span>{format(resource.createdAt, 'MMM d, yyyy')}</span>
                                                <span>•</span>
                                                <span>{resource.fileSize}</span>
                                            </div>
                                            {resource.description && (
                                                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{resource.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="icon">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </a>
                                        <form action={async () => {
                                            'use server'
                                            await deleteResource(resource.id)
                                        }}>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
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
