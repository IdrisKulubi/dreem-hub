'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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

// Targets for progress bars
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
    // Animate counter numbers counting up
    const counterElements = document.querySelectorAll('.counter-value')
    
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0')
      const element = counter as HTMLElement
      
      gsap.from(element, {
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          const value = Math.ceil(parseFloat(element.textContent || '0'))
          element.textContent = value.toLocaleString()
        }
      })
      
      gsap.to(element, {
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          const value = Math.ceil(parseFloat(element.textContent || '0'))
          element.textContent = value.toLocaleString()
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return

    const ctx = gsap.context(() => {
      // Animate cards with stagger effect (fade in + slide up)
      gsap.from('.metric-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            hasAnimated.current = true
            animateCounters()
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animateCounters])

  return (
    <section 
      ref={sectionRef} 
      id="impact-section"
      className="py-12 sm:py-16 md:py-20 bg-muted/30 dark:bg-muted/20"
      aria-labelledby="impact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <RevealHeading className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 id="impact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Our Impact Across East Africa
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Transforming agricultural value chains through solar energy innovation
          </p>
        </RevealHeading>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Entrepreneurs Supported"
            value={impactMetrics.entrepreneurs}
            target={targets.entrepreneurs}
            format="number"
            icon="👥"
          />
          <MetricCard
            title="Jobs Created"
            value={impactMetrics.jobs}
            target={targets.jobs}
            format="number"
            icon="💼"
          />
          <MetricCard
            title="GHG Emissions Reduced"
            value={impactMetrics.ghgReduced}
            target={targets.ghgReduced}
            format="number"
            unit="tonnes CO₂eq"
            icon="🌱"
          />
          <MetricCard
            title="Funding Mobilized"
            value={impactMetrics.fundingMobilized}
            target={targets.fundingMobilized}
            format="currency"
            icon="💰"
          />
        </div>
      </div>
    </section>
  )
}

interface MetricCardProps {
  title: string
  value: number
  target: number
  format: 'number' | 'currency'
  unit?: string
  icon?: string
}

function MetricCard({ 
  title, 
  value, 
  target, 
  format, 
  unit,
  icon
}: MetricCardProps) {
  const progress = (value / target) * 100
  
  return (
    <Card className="metric-card hover:shadow-lg dark:hover:shadow-dreem-orange/20 transition-all duration-300 hover:-translate-y-1 dark:bg-card/50 dark:border-slate-800">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-slate-400 leading-tight">
            {title}
          </CardTitle>
          {icon && <span className="text-xl sm:text-2xl" role="img" aria-label={title}>{icon}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        <div>
          <div 
            className="counter-value text-2xl sm:text-3xl md:text-4xl font-bold text-dreem-orange dark:text-dreem-orange-light"
            data-target={value}
            aria-live="polite"
            aria-label={`${title}: ${value.toLocaleString()}${unit ? ' ' + unit : ''}`}
          >
            0
          </div>
          {unit && (
            <p className="text-xs text-muted-foreground mt-1">{unit}</p>
          )}
          {format === 'currency' && (
            <p className="text-xs text-muted-foreground mt-1">USD</p>
          )}
        </div>
        
        <div className="space-y-1.5 sm:space-y-2">
          <Progress 
            value={progress} 
            className="h-1.5 sm:h-2"
            aria-label={`Progress towards target: ${Math.round(progress)}%`}
          />
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="text-right">
              Target: {format === 'currency' ? '$' : ''}{target.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
