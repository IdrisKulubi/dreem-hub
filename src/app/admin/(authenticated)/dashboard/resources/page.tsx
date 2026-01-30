import { getSession } from '@/app/actions/auth'
import { getResources } from '@/app/actions/resources'
import { ResourceForm } from './resource-form'
import { ResourceCard } from './resource-card'

export default async function ResourcesPage() {
    const session = await getSession()
    const resources = await getResources(session)

    return (
        <div className="space-y-8 p-6">
            <div className="bg-gradient-to-r from-dreem-orange/10 to-transparent p-6 rounded-xl border border-dreem-orange/20">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Knowledge Hub</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
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
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Published Resources</h2>
                    {resources.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed rounded-xl text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                            <p className="text-lg font-medium">No resources found</p>
                            <p className="text-sm mt-1">Upload your first resource!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {resources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
