'use client'

import { useEffect, useRef, useCallback } from 'react'
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
    <section ref={sectionRef} className="py-32">
      <div className="container px-4 mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Driving Tangible Change
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Empowering communities and transforming the region through sustainable innovation and direct action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ImpactCard
            label="Entrepreneurs Supported"
            value={impactMetrics.entrepreneurs}
            suffix="+"
            color="blue"
          />
          <ImpactCard
            label="Jobs Created"
            value={impactMetrics.jobs}
            suffix="+"
            color="blue"
          />
          <ImpactCard
            label="Tons of CO2e Reduced"
            value={impactMetrics.ghgReduced}
            suffix=""
            color="green"
          />
          <ImpactCard
            label="Funding Mobilized"
            value={impactMetrics.fundingMobilized}
            prefix="$"
            suffix="+"
            color="orange"
          />
        </div>
      </div>
    </section>
  )
}

function ImpactCard({ label, value, prefix = '', suffix = '', color = 'green' }: { label: string, value: number, prefix?: string, suffix?: string, color?: 'green' | 'blue' | 'orange' }) {
  const colorClasses = {
    green: {
      text: 'text-kcic-green dark:text-kcic-green-light',
      bg: 'from-kcic-green/5 to-transparent',
      border: 'via-kcic-green/70',
    },
    blue: {
      text: 'text-kcic-blue dark:text-kcic-blue-light',
      bg: 'from-kcic-blue/5 to-transparent',
      border: 'via-kcic-blue/70',
    },
    orange: {
      text: 'text-dreem-orange dark:text-dreem-orange-light',
      bg: 'from-dreem-orange/5 to-transparent',
      border: 'via-dreem-orange/70',
    }
  }

  const colors = colorClasses[color]

  return (
    <div className="impact-card group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 text-5xl md:text-6xl font-light text-slate-900 dark:text-white tracking-tighter">
          <span className={`${colors.text} mr-1 text-4xl align-top`}>{prefix}</span>
          <span className="counter-value" data-target={value}>0</span>
          <span className={`${colors.text} ml-1 text-4xl align-top`}>{suffix}</span>
        </div>
        <div className={`h-px w-12 bg-linear-to-r from-transparent ${colors.border} to-transparent mb-4`} />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          {label}
        </p>
      </div>
    </div>
  )
}
