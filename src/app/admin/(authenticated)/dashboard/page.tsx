import { getSession } from '@/app/actions/auth'
import { getResources } from '@/app/actions/resources'
import { getImages } from '@/app/actions/gallery'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Image as ImageIcon, Users } from 'lucide-react'

export default async function DashboardPage() {
    const session = await getSession()
    const resources = await getResources(session)
    const images = await getImages(session)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {session} Admin. Manage your country's resources and gallery.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Resources
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{resources.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Knowledge Hub items
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Gallery Images
                        </CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{images.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Uploaded photos
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Region
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{session}</div>
                        <p className="text-xs text-muted-foreground">
                            Active session
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
