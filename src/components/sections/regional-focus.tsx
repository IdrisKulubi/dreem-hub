'use client'

import { useEffect, useRef } from 'react'
import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function RegionalFocus() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.region-content', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 sm:px-6">
                <RevealHeading className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Regional Focus & Impact
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tailored interventions addressing specific value chain challenges in Kenya, Tanzania, and Uganda.
                    </p>
                </RevealHeading>

                <Tabs defaultValue="kenya" className="w-full max-w-5xl mx-auto region-content">
                    <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        {homeContent.regions.map((region) => (
                            <TabsTrigger
                                key={region.id}
                                value={region.id}
                                className="py-3 sm:py-4 text-base sm:text-lg data-[state=active]:bg-dreem-orange data-[state=active]:text-white rounded-lg transition-all"
                            >
                                <span className="mr-2 text-xl">{region.flag}</span>
                                <span className="font-semibold hidden sm:inline">{region.name}</span>
                                <span className="sm:hidden">{region.id.toUpperCase().slice(0, 3)}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {homeContent.regions.map((region) => (
                        <TabsContent key={region.id} value={region.id} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header Info */}
                            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold flex items-center gap-2">
                                            {region.organization}
                                        </h3>
                                        <p className="text-dreem-orange font-medium mt-1">
                                            Focus: {region.focus}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-sm px-3 py-1 border-dreem-orange/20 text-dreem-orange bg-dreem-orange/5">
                                        {region.name} Hub
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {region.about}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Milestones */}
                                <Card className="border-none shadow-sm bg-white dark:bg-slate-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            Key Milestones
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {region.milestones.map((milestone, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                    {milestone}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Challenges & Solutions */}
                                <Card className="border-none shadow-sm bg-white dark:bg-slate-800">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <Lightbulb className="w-5 h-5 text-amber-500" />
                                            Challenges & Solutions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {region.challenges.map((item, idx) => (
                                                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-200 mb-1">
                                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                                        {item.title}
                                                    </div>
                                                    <div className="pl-6 text-sm text-muted-foreground">
                                                        <span className="font-semibold text-dreem-orange">Solution: </span>
                                                        {item.solution}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
