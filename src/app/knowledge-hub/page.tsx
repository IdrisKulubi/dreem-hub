import { getResources } from '@/app/actions/resources'
import { KnowledgeHubResourceCard } from '@/components/knowledge-hub/resource-card'
import { CountryFilter } from '@/components/ui/country-filter'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { FileText } from 'lucide-react'

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
            <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
                <RevealHeading className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                        Knowledge <span className="text-dreem-orange">Hub</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Access our library of articles, reports, case studies, and policy documents driving the renewable energy transition in East Africa.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {resources.map((resource) => (
                            <KnowledgeHubResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
