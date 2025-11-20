'use client'

import { useEffect, useRef } from 'react'
import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Milk, Sprout, Fish, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ValueChainShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.vc-card', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const icons = {
        dairy: Milk,
        horticulture: Sprout,
        fisheries: Fish
    }

    return (
        <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 sm:px-6">
                <RevealHeading className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Value Chain Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Deploying targeted solar technologies to unlock productivity and reduce losses.
                    </p>
                </RevealHeading>

                <div className="grid md:grid-cols-3 gap-8">
                    {homeContent.valueChains.map((vc) => {
                        // @ts-ignore - Dynamic icon mapping
                        const Icon = icons[vc.id] || Zap

                        return (
                            <Card key={vc.id} className="vc-card border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader className="pb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-dreem-orange/10 flex items-center justify-center mb-4 group-hover:bg-dreem-orange group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-dreem-orange group-hover:text-white transition-colors" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{vc.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-6 min-h-[3rem]">
                                        {vc.description}
                                    </p>

                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
                                            Key Technologies
                                        </h4>
                                        <ul className="space-y-2">
                                            {vc.technologies.map((tech, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <Zap className="w-4 h-4 text-yellow-500 shrink-0" />
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
