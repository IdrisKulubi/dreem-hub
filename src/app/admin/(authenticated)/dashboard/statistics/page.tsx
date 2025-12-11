'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getStatistics } from "@/app/actions/statistics"
import { useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts"
import {
    Activity,
    Database,
    Server,
    FileText,
    Image as ImageIcon,
    Clock,
    CheckCircle2
} from "lucide-react"

// Colorful Palette
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']

export default function StatisticsPage() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getStatistics()
                setStats(data)
            } catch (error) {
                console.error("Failed to fetch statistics:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!stats) return null

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                    System Analytics
                </h2>
                <p className="text-muted-foreground">
                    Real-time monitoring and insights for DREEM Hub
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
                        <FileText className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.counts.resources}</div>
                        <p className="text-xs text-muted-foreground">Documents available</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-teal-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
                        <ImageIcon className="h-4 w-4 text-teal-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.counts.gallery}</div>
                        <p className="text-xs text-muted-foreground">Visual assets stored</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Status</CardTitle>
                        <Activity className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Healthy</div>
                        <p className="text-xs text-muted-foreground">All systems operational</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Database</CardTitle>
                        <Database className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.health.database}</div>
                        <p className="text-xs text-muted-foreground">Connection active</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Area Chart: Activity Over Time */}
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Activity Overview</CardTitle>
                        <CardDescription>Upload trends over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.charts.activity}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Donut Chart: By Category */}
                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Resources Distribution</CardTitle>
                        <CardDescription>Breakdown by category type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.charts.byCategory}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {stats.charts.byCategory.map((entry: any, index: number) => (
                                            <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {stats.charts.byCategory.map((entry: any, index: number) => (
                                <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    {entry.name} ({entry.value})
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Bar Chart: By Country */}
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Geographic Distribution</CardTitle>
                        <CardDescription>Resources uploaded by country</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart layout="vertical" data={stats.charts.byCountry}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#4ECDC4" radius={[0, 4, 4, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* System Health Detailed */}
                <Card className="col-span-3 shadow-sm bg-slate-50 dark:bg-slate-900 border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="w-5 h-5" />
                            System Health
                        </CardTitle>
                        <CardDescription>Technical metrics & status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                    <Database className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Database Status</p>
                                    <p className="text-xs text-muted-foreground">PostgreSQL (Neon)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                                <CheckCircle2 className="w-4 h-4" />
                                {stats.health.database}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Last Activity</p>
                                    <p className="text-xs text-muted-foreground">Newest upload</p>
                                </div>
                            </div>
                            <div className="text-sm text-right">
                                {stats.health.lastActivity ? (
                                    <>
                                        <p className="font-medium text-slate-800 dark:text-slate-200">
                                            {new Date(stats.health.lastActivity).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(stats.health.lastActivity).toLocaleTimeString()}
                                        </p>
                                    </>
                                ) : (
                                    <span className="text-muted-foreground">No activity yet</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <p className="text-xs text-muted-foreground mb-1">Environment</p>
                                <p className="font-mono text-sm">Node {stats.health.version}</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                <p className="text-xs text-muted-foreground mb-1">App Status</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-medium">Live</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
