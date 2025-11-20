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
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Animate counter numbers counting up
    const counterElements = document.querySelectorAll('.counter-value')

    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0')
      const element = counter as HTMLElement

      // Reset to 0 first
      element.textContent = '0'

      gsap.to(element, {
        textContent: target,
        duration: 2,
        ease: 'power1.out',
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
        start: 'top 80%',
        onEnter: animateCounters,
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animateCounters])

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <RevealHeading>
            Our Impact
          </RevealHeading>
          <p className="mt-4 text-muted-foreground">
            Driving tangible change across the region
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Entrepreneurs Supported"
            value={impactMetrics.entrepreneurs}
            target={targets.entrepreneurs}
            dataKey="entrepreneurs"
          />
          <MetricCard
            title="Jobs Created"
            value={impactMetrics.jobs}
            target={targets.jobs}
            dataKey="jobs"
          />
          <MetricCard
            title="Tons of CO2e Reduced"
            value={impactMetrics.ghgReduced}
            target={targets.ghgReduced}
            dataKey="ghgReduced"
          />
          <MetricCard
            title="Funding Mobilized ($)"
            value={impactMetrics.fundingMobilized}
            target={targets.fundingMobilized}
            dataKey="fundingMobilized"
          />
        </div>
      </div>
    </section>
  )
}

function MetricCard({ title, value, target, dataKey }: { title: string, value: number, target: number, dataKey: string }) {
  const progress = (value / target) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          <span className="counter-value" data-target={value}>0</span>
          {dataKey === 'fundingMobilized' ? '+' : '+'}
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Target: {target.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}
