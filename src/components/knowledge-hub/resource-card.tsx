import Image from 'next/image'
import { format } from 'date-fns'
import { FileText, Download, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResourceShareButton } from '@/components/knowledge-hub/resource-share-button'

type Resource = {
    id: string
    title: string
    description: string | null
    category: string
    country: string
    fileUrl: string
    fileSize: string | null
    coverImageUrl: string | null
    createdAt: Date
}

export function KnowledgeHubResourceCard({ resource }: { resource: Resource }) {
    if (resource.coverImageUrl) {
        return (
            <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={resource.coverImageUrl}
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white shadow-lg">
                        {resource.category}
                    </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-dreem-orange uppercase tracking-wider">
                            {resource.country}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">
                            {format(resource.createdAt, 'MMM d, yyyy')}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-dreem-orange transition-colors">
                        {resource.title}
                    </h3>

                    {resource.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-1 mb-4">
                            {resource.description}
                        </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            {resource.fileSize && (
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {resource.fileSize}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center -mr-2">
                            <ResourceShareButton
                                title={resource.title}
                                fileUrl={resource.fileUrl}
                                description={resource.description}
                            />
                            <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="ghost" className="hover:text-dreem-orange hover:bg-dreem-orange/10">
                                    Download <Download className="w-3 h-3 ml-1.5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-dreem-orange/10 rounded-xl">
                    <FileText className="w-6 h-6 text-dreem-orange" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {resource.category}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-dreem-orange transition-colors">
                {resource.title}
            </h3>

            {resource.description && (
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                    {resource.description}
                </p>
            )}

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(resource.createdAt, 'MMM yyyy')}
                    </span>
                    {resource.fileSize && (
                        <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {resource.fileSize}
                        </span>
                    )}
                </div>

                <div className="flex items-center -mr-2">
                    <ResourceShareButton
                        title={resource.title}
                        fileUrl={resource.fileUrl}
                        description={resource.description}
                    />
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="hover:text-dreem-orange hover:bg-dreem-orange/10">
                            Download <Download className="w-3 h-3 ml-1.5" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}
