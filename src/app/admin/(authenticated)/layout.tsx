import { getSession } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    LayoutDashboard,
    BookOpen,
    Image as ImageIcon,
    LogOut,
    BarChart3,
} from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    if (!session) {
        redirect('/admin/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col fixed h-full">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-xl font-bold">DREEM<span className="text-dreem-orange">Admin</span></div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                        {session} Dashboard
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            Overview
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/resources">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <BookOpen className="w-4 h-4" />
                            Knowledge Hub
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/gallery">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Gallery
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/statistics">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Statistics
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <form action={logoutAction}>
                        <Button variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    )
}
