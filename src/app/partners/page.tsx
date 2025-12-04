'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PartnersPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.partner-card')

    // Set initial state
    gsap.set(cards, { opacity: 1, y: 0 })

    // Animate on scroll
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
      onComplete: () => {
        // Ensure cards are visible after animation
        gsap.set(cards, { opacity: 1, y: 0 })
      },
    })
  }, [])

  const partners = [
    {
      name: 'Mott Foundation',
      role: 'Primary Funder',
      logo: '/images/patners/Mott.png',
      description:
        'The Charles Stewart Mott Foundation supports initiatives that promote a just, equitable, and sustainable society. Their funding enables DREEM Hub to scale solar energy adoption across East African agricultural value chains.',
      focus: ['Climate Action', 'Economic Development', 'Community Empowerment'],
    },
    {
      name: 'Kenya Climate Innovation Center (KCIC)',
      role: 'Hub Host - Kenya',
      logo: '/images/patners/KCIC.png',
      description:
        'KCIC serves as the central coordination hub for Kenya, managing partnerships, strategy, and implementation across dairy and horticulture value chains in Kitui, Makueni, Isiolo, and Laikipia counties.',
      focus: ['Dairy Value Chain', 'Horticulture', 'Capacity Building'],
    },
    {
      name: 'WWF Tanzania',
      role: 'Hub Host - Tanzania',
      logo: '/images/patners/WWF.png',
      description:
        'WWF Tanzania coordinates the DREEM Hub in Tanzania, focusing on sustainable fisheries through solar adoption in the Mafia Island Dagaa value chain, replacing fossil fuel-based systems with clean energy solutions.',
      focus: ['Fisheries', 'Marine Conservation', 'Sustainable Energy'],
    },

  ]

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Building Impact Together
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              DREEM Hub collaborates with leading organizations committed to sustainable development, climate action, and economic empowerment across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section ref={sectionRef} className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {partners.map((partner, index) => {
              const colors = [
                { border: 'hover:border-dreem-orange/30', badge: 'bg-dreem-orange/10 text-dreem-orange', focus: 'hover:border-dreem-orange/50 hover:bg-dreem-orange/5' },
                { border: 'hover:border-kcic-blue/30', badge: 'bg-kcic-blue/10 text-kcic-blue', focus: 'hover:border-kcic-blue/50 hover:bg-kcic-blue/5' },
                { border: 'hover:border-kcic-green/30', badge: 'bg-kcic-green/10 text-kcic-green', focus: 'hover:border-kcic-green/50 hover:bg-kcic-green/5' }
              ][index % 3]

              return (
                <Card
                  key={index}
                  className={`partner-card group overflow-hidden border-slate-200 dark:border-slate-800 ${colors.border} transition-all duration-500 hover:shadow-xl`}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[300px_1fr] gap-0">
                      {/* Logo Section */}
                      <div className="relative bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                        <div className="relative w-full h-32 md:h-40">
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            fill
                            className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-dreem-orange/0 via-transparent to-kcic-blue/0 group-hover:from-dreem-orange/5 group-hover:to-kcic-blue/5 transition-all duration-500" />
                      </div>

                      {/* Content Section */}
                      <div className="p-8 md:p-10 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                              {partner.name}
                            </h2>
                            <span className={`px-3 py-1 rounded-full ${colors.badge} text-xs font-semibold uppercase tracking-wider`}>
                              {partner.role}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {partner.description}
                        </p>

                        {/* Focus Areas */}
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                            Focus Areas
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {partner.focus.map((area, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700 ${colors.focus} transition-all duration-200`}
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


      <Footer />
    </main>
  )
}
