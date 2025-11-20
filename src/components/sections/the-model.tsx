'use client'

import { useEffect, useRef } from 'react'
import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Network, Share2, Sprout } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function TheModel() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.model-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const icons = [Network, Share2, Sprout]

    return (
        <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 sm:px-6">
                <RevealHeading className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        {homeContent.theModel.title}
                    </h2>
                    <p className="text-xl text-dreem-orange font-medium mb-4">
                        {homeContent.theModel.subtitle}
                    </p>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {homeContent.theModel.description}
                    </p>
                </RevealHeading>

                <div className="grid md:grid-cols-3 gap-8">
                    {homeContent.theModel.features.map((feature, index) => {
                        const Icon = icons[index]
                        return (
                            <div key={index} className="model-card p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-dreem-orange/10 rounded-xl flex items-center justify-center mb-6 text-dreem-orange">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
