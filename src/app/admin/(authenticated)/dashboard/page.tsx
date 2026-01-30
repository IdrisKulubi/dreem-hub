import { getSession } from '@/app/actions/auth'
import { getResources } from '@/app/actions/resources'
import { getEvents } from '@/app/actions/gallery'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Image as ImageIcon, Users, ArrowRight, FolderOpen } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
    const session = await getSession()
    const resources = await getResources(session)
    const events = await getEvents(session)
    
    const totalImages = events.reduce((acc, event) => acc + (event.images?.length || 0), 0)

    return (
        <div className="space-y-8 p-6">
            <div className="bg-gradient-to-r from-dreem-orange/10 via-dreem-orange/5 to-transparent p-6 rounded-xl border border-dreem-orange/20">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Welcome back! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    {session} Admin Dashboard - Manage your country's resources and gallery.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-2 hover:border-dreem-orange/30 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Knowledge Hub
                        </CardTitle>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                            {resources.length}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Published resources
                        </p>
                        <Link href="/admin/dashboard/resources">
                            <Button variant="ghost" size="sm" className="mt-4 text-dreem-orange hover:text-dreem-orange hover:bg-dreem-orange/10">
                                Manage <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-dreem-orange/30 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Gallery Events
                        </CardTitle>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <FolderOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                            {events.length}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Events with {totalImages} photos
                        </p>
                        <Link href="/admin/dashboard/gallery">
                            <Button variant="ghost" size="sm" className="mt-4 text-dreem-orange hover:text-dreem-orange hover:bg-dreem-orange/10">
                                Manage <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-dreem-orange/30 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Active Region
                        </CardTitle>
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                            {session}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Current session
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card className="bg-gradient-to-br from-dreem-orange/10 to-orange-100/50 dark:from-dreem-orange/20 dark:to-orange-900/20 border-dreem-orange/30">
                    <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/admin/dashboard/resources">
                            <Button variant="outline" className="w-full justify-start bg-white dark:bg-slate-900">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Upload New Resource
                            </Button>
                        </Link>
                        <Link href="/admin/dashboard/gallery">
                            <Button variant="outline" className="w-full justify-start bg-white dark:bg-slate-900">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Add Gallery Event
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <p>💡 <strong>Gallery Events:</strong> Group multiple images together by creating an event (e.g., "Training in Nairobi")</p>
                        <p>✏️ <strong>Edit Anytime:</strong> You can now edit resource details and event information after uploading</p>
                        <p>📸 <strong>Cover Images:</strong> The first image you upload becomes the event cover automatically</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
