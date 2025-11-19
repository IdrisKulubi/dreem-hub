'use client'

import { useEffect, useRef } from 'react'
import { RevealHeading } from '@/components/ui/reveal-heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutMission() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    gsap.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
        once: true
      }
    })
  }, [])

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 bg-muted/50 dark:bg-muted/20"
      aria-labelledby="about-heading"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <RevealHeading className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
            About DREEM Hub
          </h2>
        </RevealHeading>

        <div ref={contentRef} className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-foreground dark:text-slate-300">
          <p>
            The DREEM Hub (Distributed Renewable Energy Ecosystem Model Hub) is a transformative 
            multi-country initiative spanning Kenya, Uganda, and Tanzania. We are dedicated to 
            scaling solar energy adoption across agricultural value chains in East Africa, 
            empowering youth and women entrepreneurs while driving climate action and sustainable 
            economic development.
          </p>

          <p>
            At the heart of our approach is <strong className="text-foreground dark:text-slate-100">PUSE (Productive Use of Solar Energy)</strong> 
            – the application of solar technology to income-generating activities. By integrating 
            solar solutions into dairy, horticulture, fisheries, and other agricultural value chains, 
            we enable entrepreneurs to increase productivity, reduce costs, and build climate-resilient 
            businesses. PUSE transforms solar energy from a basic utility into a catalyst for economic 
            growth and environmental sustainability.
          </p>

          <p>
            DREEM Hub is proudly supported by the <strong className="text-foreground dark:text-slate-100">Mott Foundation</strong>, whose partnership 
            enables us to provide comprehensive support including financing, skills development, 
            enterprise support, and community impact initiatives. Together, we are building a 
            sustainable ecosystem that connects entrepreneurs, financial institutions, technology 
            providers, and development partners to accelerate the clean energy transition across 
            East Africa.
          </p>
        </div>
      </div>
    </section>
  )
}
