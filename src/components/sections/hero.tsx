'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowDown, Mail } from 'lucide-react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!backgroundRef.current || !contentRef.current) return

    // Parallax effect on background
    gsap.to(backgroundRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: backgroundRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    // Fade in content on load
    gsap.from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const scrollToImpact = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: '#impact-section',
      ease: 'power2.inOut'
    })
  }

  return (
    <section
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}


      {/* Background Image with Overlay */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <Image
          src="/hero-solar-agri.png"
          alt="Solar panels in an agricultural field in East Africa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background/90" />
        <div className="absolute inset-0 bg-dreem-orange/10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container px-4 sm:px-6 py-16 sm:py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-lg">
            Solarizing Agricultural Value Chains{' '}
            <span className="text-dreem-orange-light block sm:inline">Across East Africa</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-md font-medium">
            Empowering youth and women entrepreneurs through productive use of solar energy,
            driving climate action and sustainable development across Kenya, Uganda, and Tanzania.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 px-4 sm:px-0">
            <Button
              size="lg"
              onClick={scrollToImpact}
              className="bg-dreem-orange hover:bg-dreem-orange-dark text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-lg shadow-dreem-orange/20 border-none"
              aria-label="Learn more about our impact - scroll to impact section"
            >
              Learn More
              <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-dreem-orange text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto transition-all duration-300 hover:scale-105"
            >
              <a href="mailto:info@dreemhub.org" aria-label="Contact us to get involved - send email to info@dreemhub.org">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                Get Involved
              </a>
            </Button>
          </div>

          {/* Country Flags */}
          <div
            className="flex justify-center items-center gap-4 sm:gap-6 pt-6 sm:pt-8 text-4xl sm:text-5xl md:text-6xl drop-shadow-md"
            role="img"
            aria-label="Countries we serve: Kenya, Uganda, and Tanzania"
          >
            <span className="animate-bounce-slow hover:scale-110 transition-transform cursor-default" style={{ animationDelay: '0s' }} aria-label="Kenya" title="Kenya">🇰🇪</span>
            <span className="animate-bounce-slow hover:scale-110 transition-transform cursor-default" style={{ animationDelay: '0.2s' }} aria-label="Uganda" title="Uganda">🇺🇬</span>
            <span className="animate-bounce-slow hover:scale-110 transition-transform cursor-default" style={{ animationDelay: '0.4s' }} aria-label="Tanzania" title="Tanzania">🇹🇿</span>
          </div>
        </div>
      </div>

      {/* Bottom Fade to Content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-1" aria-hidden="true" />
    </section>
  )
}
