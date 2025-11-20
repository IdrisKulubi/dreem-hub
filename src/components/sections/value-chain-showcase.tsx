'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'
import { Milk, Sprout, Fish, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ValueChainShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo('.vc-card',
                {
                    y: 60,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const icons = {
        dairy: Milk,
        horticulture: Sprout,
        fisheries: Fish
    }

    const images = {
        dairy: '/images/dairy_solar.png',
        horticulture: '/images/horticulture_solar.png',
        fisheries: '/images/fisheries_solar.png'
    }

    return (
        <section ref={sectionRef} className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-dreem-blue/5 blur-3xl" />
                <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-dreem-orange/5 blur-3xl" />
            </div>

            <div className="container px-4 sm:px-6 relative z-10">
                <RevealHeading className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-dreem-blue/10 text-dreem-blue text-sm font-semibold mb-4">
                        Our Focus Areas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
                        Value Chain Solutions
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Deploying targeted solar technologies to unlock productivity, reduce losses, and empower communities across key sectors.
                    </p>
                </RevealHeading>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {homeContent.valueChains && homeContent.valueChains.length > 0 ? (
                        homeContent.valueChains.map((vc) => {
                            // @ts-expect-error - Dynamic icon mapping
                            const Icon = icons[vc.id] || Zap
                            // @ts-expect-error - Dynamic image mapping
                            const imageSrc = images[vc.id] || '/images/dairy_solar.png'

                            return (
                                <div
                                    key={vc.id}
                                    className="vc-card group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 dark:border-slate-800 flex flex-col h-full"
                                >
                                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-slate-50/50 dark:to-slate-800/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Image Section */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                        <Image
                                            src={imageSrc}
                                            alt={vc.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            priority={false}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-slate-900 via-white/20 dark:via-slate-900/20 to-transparent" />
                                    </div>

                                    <div className="relative z-10 p-6 flex flex-col grow">
                                        {/* Icon */}
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg border-4 border-white dark:border-slate-900 -mt-14 relative shrink-0">
                                            <Icon className="w-8 h-8 text-dreem-blue dark:text-dreem-orange group-hover:text-dreem-orange dark:group-hover:text-dreem-blue transition-colors duration-300" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-dreem-blue dark:group-hover:text-dreem-orange transition-colors duration-300">
                                            {vc.title}
                                        </h3>

                                        {/* Description - Grows to fill space */}
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-base grow">
                                            {vc.description}
                                        </p>

                                        {/* Technologies Section - Always at bottom */}
                                        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                Key Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {vc.technologies && vc.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-dreem-blue/30 group-hover:bg-dreem-blue/10 transition-colors duration-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-3 text-center py-20">
                            <p className="text-slate-500">No value chains data available</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
