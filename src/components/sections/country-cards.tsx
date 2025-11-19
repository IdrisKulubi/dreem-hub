'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Hardcoded country data
const countries = [
  {
    name: 'Kenya',
    flag: '🇰🇪',
    color: 'dreem-orange',
    leadOrg: 'Kenya Climate Innovation Center (KCIC)',
    valueChains: ['Dairy', 'Horticulture'],
    grantAmount: 750000,
    entrepreneurs: 450,
    jobs: 1200
  },
  {
    name: 'Uganda',
    flag: '🇺🇬',
    color: 'kcic-blue',
    leadOrg: 'TBD',
    valueChains: ['TBD'],
    grantAmount: 0,
    entrepreneurs: 300,
    jobs: 800
  },
  {
    name: 'Tanzania',
    flag: '🇹🇿',
    color: 'kcic-green',
    leadOrg: 'WWF Tanzania',
    valueChains: ['Fisheries'],
    grantAmount: 0,
    entrepreneurs: 250,
    jobs: 800
  }
]

export function CountryCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.country-card')

    // GSAP ScrollTrigger animation: fade in and slide up with stagger
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {countries.map((country) => (
        <Card 
          key={country.name}
          className="country-card group hover:shadow-xl dark:hover:shadow-2xl dark:bg-card/50 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2"
          style={{
            borderTop: `4px solid hsl(var(--${country.color}))`
          }}
          role="article"
          aria-label={`${country.name} program information`}
        >
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <span role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
                <span>{country.name}</span>
              </CardTitle>
              <Badge variant="secondary" className="text-[10px] sm:text-xs shrink-0">
                {country.leadOrg.split(' ')[0]}
              </Badge>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              {country.valueChains.join(', ')} value chains
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400">
              <span className="font-medium dark:text-slate-300">Lead Organization:</span>
              <p className="mt-1 leading-snug">{country.leadOrg}</p>
            </div>
            
            {country.grantAmount > 0 && (
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400">
                <span className="font-medium dark:text-slate-300">Grant Amount:</span>
                <p className="mt-1 text-base sm:text-lg font-bold" style={{ color: `hsl(var(--${country.color}))` }}>
                  ${(country.grantAmount / 1000).toFixed(0)}k
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 border-t dark:border-slate-700">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground dark:text-slate-400">Entrepreneurs</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: `hsl(var(--${country.color}))` }}>
                  {country.entrepreneurs}
                </p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground dark:text-slate-400">Jobs Created</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: `hsl(var(--${country.color}))` }}>
                  {country.jobs}
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-3 sm:pt-4">
            <Button 
              variant="ghost" 
              className="w-full group-hover:bg-accent transition-all duration-300 text-sm sm:text-base"
              disabled
              aria-label={`Learn more about ${country.name} program (coming soon)`}
            >
              Learn More <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
