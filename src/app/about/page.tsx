'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sun, Users, Globe } from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroTextRef = useRef<HTMLHeadingElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const tl = gsap.timeline()

            tl.from(heroTextRef.current?.querySelectorAll('.char') || [], {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power4.out',
                delay: 0.2
            })
                .from('.hero-sub', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.5')

            // Scroll Animations for sections
            const sections = sectionsRef.current?.children
            if (sections) {
                Array.from(sections).forEach((section) => {
                    gsap.from(section, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    })
                })
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={containerRef} className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-20">
                <div className="max-w-5xl">
                    <h1 ref={heroTextRef} className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]">
                        <span className="block overflow-hidden"><span className="char inline-block">We</span> <span className="char inline-block">Are</span></span>
                        <span className="block overflow-hidden text-dreem-orange"><span className="char inline-block">DREEM</span> <span className="char inline-block">Hub.</span></span>
                    </h1>

                    <div className="hero-sub max-w-2xl">
                        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                            Accelerating the adoption of productive solar energy across East Africa.
                            Minimal intervention. Maximum impact.
                        </p>
                    </div>
                </div>

                {/* Abstract Background Element */}
                <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-dreem-orange/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
            </section>

            {/* Content Sections */}
            <div ref={sectionsRef} className="px-6 sm:px-12 md:px-24 pb-32 space-y-32">

                {/* Mission */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4">
                        <span className="text-xs font-bold tracking-widest uppercase text-dreem-orange mb-4 block">The Mission</span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Empowering Communities</h2>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                            We operate on a simple yet powerful premise: <strong className="text-slate-900 dark:text-white font-medium">Energy is the catalyst for growth.</strong> By integrating solar solutions into agricultural value chains—Dairy, Horticulture, and Fisheries—we enable entrepreneurs in Kenya, Uganda, and Tanzania to increase productivity, reduce waste, and build climate-resilient businesses.
                        </p>
                    </div>
                </section>

                {/* The Approach (PUSE) */}
                <section className="grid md:grid-cols-12 gap-12 items-start border-t border-slate-100 dark:border-slate-800 pt-24">
                    <div className="md:col-span-4">
                        <span className="text-xs font-bold tracking-widest uppercase text-dreem-orange mb-4 block">Our Approach</span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">PUSE Methodology</h2>
                    </div>
                    <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-dreem-orange/30 transition-colors duration-300">
                            <Sun className="w-8 h-8 text-dreem-orange mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Productive Use</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Moving beyond basic lighting to energy that generates income—cooling milk, drying fish, irrigating crops.
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-dreem-orange/30 transition-colors duration-300">
                            <Globe className="w-8 h-8 text-dreem-orange mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Ecosystem Building</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Connecting technology providers, financiers, and farmers in a sustainable, self-reinforcing network.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats / Impact Preview */}
                <section className="py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Countries", value: "3" },
                            { label: "Value Chains", value: "3" },
                            { label: "Entrepreneurs", value: "1000+" },
                            { label: "Impact", value: "Infinite" }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center md:text-left">
                                <div className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{stat.value}</div>
                                <div className="text-sm text-slate-500 uppercase tracking-widest font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="flex flex-col items-center text-center pt-12">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                        Join the <span className="text-dreem-orange">Movement.</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <button className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium overflow-hidden transition-all hover:scale-105">
                                <span className="relative z-10 flex items-center gap-2">
                                    Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>
                        <Link href="/partners">
                            <button className="px-8 py-4 bg-transparent border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                View Partners
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    )
}
