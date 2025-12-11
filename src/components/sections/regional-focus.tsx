'use client'

import { useEffect, useRef, useState } from 'react'
import { homeContent } from '@/data/home-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function RegionalFocus() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState("kenya")

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.region-header', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const getRegionColor = (id: string) => {
        switch (id) {
            case 'kenya': return {
                active: 'data-[state=active]:bg-kcic-blue',
               text: 'text-kcic-blue',
                bg: 'bg-kcic-blue/10',
                border: 'border-kcic-blue/20',
                gradient: 'from-kcic-blue to-cyan-500'
            }
            case 'uganda': return {
                active: 'data-[state=active]:bg-kcic-green',
                text: 'text-kcic-green',
                bg: 'bg-kcic-green/10',
                border: 'border-kcic-green/20',
                gradient: 'from-kcic-green to-emerald-500'
            }
            case 'tanzania': return {
                active: 'data-[state=active]:bg-kcic-blue',
                text: 'text-kcic-blue',
                bg: 'bg-kcic-blue/10',
                border: 'border-kcic-blue/20',
                gradient: 'from-kcic-blue to-cyan-500'
            }
            default: return {
                active: 'data-[state=active]:bg-dreem-orange',
                text: 'text-dreem-orange',
                bg: 'bg-dreem-orange/10',
                border: 'border-dreem-orange/20',
                gradient: 'from-dreem-orange to-amber-500'
            }
        }
    }

    return (
        <section ref={sectionRef} className="py-32 bg-slate-50/50 dark:bg-slate-900/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-dreem-orange/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 sm:px-6 relative z-10">
                <div className="region-header mb-16 text-center max-w-3xl mx-auto">
                    <Badge variant="outline" className="mb-4 border-dreem-orange/20 text-dreem-orange bg-dreem-orange/5 px-4 py-1 rounded-full">
                        Regional Impact
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
                        Tailored Interventions Across East Africa
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        We adapt our approach to the unique agricultural landscapes and challenges of each country, ensuring maximum relevance and impact.
                    </p>
                </div>

                <Tabs
                    defaultValue="kenya"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full max-w-6xl mx-auto"
                >
                    <div className="flex justify-center mb-12">
                        <TabsList className="h-auto p-1.5 bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-sm">
                            {homeContent.regions.map((region) => {
                                const colors = getRegionColor(region.id)
                                return (
                                    <TabsTrigger
                                        key={region.id}
                                        value={region.id}
                                        className={`rounded-full px-6 py-3 text-base font-medium ${colors.active} data-[state=active]:text-white transition-all duration-300`}
                                    >
                                        <span className="mr-2 text-xl">{region.flag}</span>
                                        {region.name}
                                    </TabsTrigger>
                                )
                            })}
                        </TabsList>
                    </div>

                    {homeContent.regions.map((region) => {
                        const colors = getRegionColor(region.id)
                        return (
                            <TabsContent key={region.id} value={region.id} className="mt-0 focus-visible:outline-none">
                                <div className="grid lg:grid-cols-12 gap-8 items-start">
                                    {/* Left Column: Region Info */}
                                    <div className="lg:col-span-5 space-y-6">
                                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-4xl">{region.flag}</span>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{region.name} Hub</h3>
                                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        {region.organization}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Primary Focus</h4>
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-lg ${colors.bg} ${colors.text} font-medium text-sm`}>
                                                        {region.focus}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">About the Hub</h4>
                                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                        {region.about}
                                                    </p>
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Milestones</h4>
                                                    <ul className="space-y-3">
                                                        {region.milestones.map((milestone, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                                                <CheckCircle2 className={`w-5 h-5 ${colors.text} shrink-0 mt-0.5`} />
                                                                <span>{milestone}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Challenges & Solutions */}
                                    <div className="lg:col-span-7 space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {region.challenges.map((item, idx) => (
                                                <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-slate-800 overflow-hidden group">
                                                    <div className={`h-1 w-full bg-linear-to-r ${colors.gradient}`} />
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <span className="text-xs font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                                Challenge {idx + 1}
                                                            </span>
                                                        </div>

                                                        <h4 className={`font-semibold text-slate-900 dark:text-white mb-2 group-hover:${colors.text} transition-colors`}>
                                                            {item.title}
                                                        </h4>

                                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                                            <div className={`flex items-center gap-2 text-sm font-medium ${colors.text} mb-1`}>
                                                                <Lightbulb className="w-4 h-4" />
                                                                Solution
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.solution}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}

                                            {/* Add a summary/CTA card to fill the grid if odd number or just as an extra */}
                                            <Card className={`border-none shadow-md bg-linear-to-br ${colors.gradient} text-white flex flex-col justify-center items-center text-center p-6`}>
                                                <div className="mb-4 p-3 rounded-full bg-white/10">
                                                    <ArrowRight className="w-6 h-6 text-white" />
                                                </div>
                                                <h4 className="font-semibold text-lg mb-2">View Full Report</h4>
                                                <p className="text-sm text-white/80 mb-4">
                                                    Download the detailed regional analysis for {region.name}.
                                                </p>
                                                <button className="text-xs font-bold uppercase tracking-wider hover:text-white/80 transition-colors">
                                                    Download PDF
                                                </button>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </section>
    )
}
