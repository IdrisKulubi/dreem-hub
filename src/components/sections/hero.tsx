'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const backgroundElement = backgroundRef.current
    const contentElement = contentRef.current
    const videoElement = videoRef.current

    if (!backgroundElement || !contentElement) return

    let motionQuery: MediaQueryList | undefined

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (!videoElement) return
      if (event.matches) {
        videoElement.pause()
      } else {
        void videoElement.play().catch(() => void 0)
      }
    }

    if (typeof window !== 'undefined' && videoElement) {
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (motionQuery.matches) {
        videoElement.pause()
      } else {
        void videoElement.play().catch(() => void 0)
      }
      motionQuery.addEventListener('change', handleMotionPreference)
    }

    // Parallax effect on background
    gsap.to(backgroundElement, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: backgroundElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    // Fade in content on load
    gsap.from(contentElement.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    })

    return () => {
      videoElement?.pause()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      motionQuery?.removeEventListener('change', handleMotionPreference)
    }
  }, [])

  return (
    <section
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}


      {/* Background Image with Overlay */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/hero-solar-agri.png"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-dreem-orange/20 via-kcic-green/10 to-kcic-blue/20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container px-4 sm:px-6 py-16 sm:py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-lg">
            Solarizing Agricultural Value Chains{' '}
            <span className="bg-gradient-to-r from-dreem-orange via-kcic-green to-kcic-blue bg-clip-text text-transparent block sm:inline pb-2">Across East Africa</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-md font-medium">
            Empowering youth and women entrepreneurs through productive use of solar energy,
            driving climate action and sustainable development across Kenya, Uganda, and Tanzania.
          </p>

          <div className="pt-6 sm:pt-8">
            <div className="mx-auto w-72 sm:w-64 md:w-80">
              <Image
                src="/hero-countries.png"
                alt="Map icons highlighting Kenya, Uganda, and Tanzania"
                width={288}
                height={104}
                className="w-full h-auto object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade to Content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background via-background/80 to-transparent z-1" aria-hidden="true" />
    </section>
  )
}
