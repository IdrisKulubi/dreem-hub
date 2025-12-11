'use client'

import { useEffect, useRef } from 'react'
import { homeContent } from '@/data/home-content'
import { NetworkIcon, ShareNetworkIcon, PlantIcon } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function TheModel() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.from('.model-header', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            })

            // Cards animation
            const cards = gsap.utils.toArray('.model-card')
            gsap.fromTo(cards,
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 75%',
                    }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const icons = [NetworkIcon, ShareNetworkIcon, PlantIcon]

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-dreem-orange/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 mx-auto">
                <div className="model-header text-center mb-20 max-w-4xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-dreem-orange/10 text-dreem-orange text-sm font-semibold tracking-wide mb-6">
                        OUR APPROACH
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        {homeContent.theModel.title}
                    </h2>
                    <p className="text-2xl text-slate-600 dark:text-slate-300 font-light mb-6">
                        {homeContent.theModel.subtitle}
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {homeContent.theModel.description}
                    </p>
                </div>

                <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {homeContent.theModel.features.map((feature, index) => {
                        const Icon = icons[index]
                        const colors = [
                            {
                                text: 'text-dreem-orange',
                                border: 'hover:border-dreem-orange/30 dark:hover:border-dreem-orange/30',
                                shadow: 'hover:shadow-dreem-orange/5',
                                bg: 'group-hover:from-dreem-orange/5',
                                iconBg: 'group-hover:bg-dreem-orange/10'
                            },
                            {
                                text: 'text-kcic-blue',
                                border: 'hover:border-kcic-blue/30 dark:hover:border-kcic-blue/30',
                                shadow: 'hover:shadow-kcic-blue/5',
                                bg: 'group-hover:from-kcic-blue/5',
                                iconBg: 'group-hover:bg-kcic-blue/10'
                            },
                            {
                                text: 'text-kcic-green',
                                border: 'hover:border-kcic-green/30 dark:hover:border-kcic-green/30',
                                shadow: 'hover:shadow-kcic-green/5',
                                bg: 'group-hover:from-kcic-green/5',
                                iconBg: 'group-hover:bg-kcic-green/10'
                            }
                        ][index]

                        return (
                            <div
                                key={index}
                                className={`model-card group relative p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 ${colors.border} transition-all duration-500 hover:shadow-2xl ${colors.shadow}`}
                            >
                                <div className={`absolute inset-0 bg-linear-to-br from-transparent to-transparent ${colors.bg} group-hover:to-transparent rounded-3xl transition-all duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${colors.iconBg}`}>
                                        <Icon  />
                                    </div>

                                    <h3 className={`text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:${colors.text} transition-colors duration-300`}>
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
