import { getResources } from '@/app/actions/resources'
import { CountryFilter } from '@/components/ui/country-filter'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { FileText, Download, Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

export default async function KnowledgeHubPage({
    searchParams,
}: {
    searchParams: Promise<{ country?: string }>
}) {
    const params = await searchParams
    const country = params.country || 'All'
    const resources = await getResources(country)

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
            <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
                <RevealHeading className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                        Knowledge <span className="text-dreem-orange">Hub</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Access our library of reports, case studies, and policy documents driving the renewable energy transition in East Africa.
                    </p>
                </RevealHeading>

                <CountryFilter />

                {resources.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
                            <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No resources found</h3>
                        <p className="text-muted-foreground mt-1">
                            Try selecting a different country or check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300 flex flex-col"
                            >
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
                                        <span className="flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {resource.fileSize}
                                        </span>
                                    </div>

                                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Button size="sm" variant="ghost" className="hover:text-dreem-orange hover:bg-dreem-orange/10 -mr-2">
                                            Download <Download className="w-3 h-3 ml-1.5" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
