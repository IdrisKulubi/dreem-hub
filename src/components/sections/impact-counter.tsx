'use client'

import { useEffect, useRef, useCallback } from 'react'
import { RevealHeading } from '@/components/ui/reveal-heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Hardcoded metrics as per task requirements
const impactMetrics = {
  entrepreneurs: 1000,
  jobs: 2800,
  ghgReduced: 300000,
  fundingMobilized: 800000
}

// Targets for progress bars (kept for reference/calculations if needed, though visual style is changing)
const targets = {
  entrepreneurs: 1500,
  jobs: 4000,
  ghgReduced: 500000,
  fundingMobilized: 1000000
}

export function ImpactCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animateCounters = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Animate counter numbers counting up
    const counterElements = document.querySelectorAll('.counter-value')
    const cards = document.querySelectorAll('.impact-card')

    // Animate cards entrance
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    )

    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0')
      const element = counter as HTMLElement

      // Reset to 0 first
      element.textContent = '0'

      gsap.to(element, {
        textContent: target,
        duration: 2.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          const value = Math.ceil(parseFloat(element.textContent || '0'))
          element.textContent = value.toLocaleString()
        }
      })
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: animateCounters,
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animateCounters])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/impact-bg.png')" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-emerald-400 tracking-wider uppercase">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Driving Tangible Change
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed">
            Empowering communities and transforming the region through sustainable innovation and direct action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ImpactCard
            label="Entrepreneurs Supported"
            value={impactMetrics.entrepreneurs}
            suffix="+"
          />
          <ImpactCard
            label="Jobs Created"
            value={impactMetrics.jobs}
            suffix="+"
          />
          <ImpactCard
            label="Tons of CO2e Reduced"
            value={impactMetrics.ghgReduced}
            suffix=""
          />
          <ImpactCard
            label="Funding Mobilized"
            value={impactMetrics.fundingMobilized}
            prefix="$"
            suffix="+"
          />
        </div>
      </div>
    </section>
  )
}

function ImpactCard({ label, value, prefix = '', suffix = '' }: { label: string, value: number, prefix?: string, suffix?: string }) {
  return (
    <div className="impact-card group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 text-5xl md:text-6xl font-light text-white tracking-tighter">
          <span className="text-emerald-400/80 mr-1 text-4xl align-top">{prefix}</span>
          <span className="counter-value" data-target={value}>0</span>
          <span className="text-emerald-400/80 ml-1 text-4xl align-top">{suffix}</span>
        </div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-4" />
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
          {label}
        </p>
      </div>
    </div>
  )
}
