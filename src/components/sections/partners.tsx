'use client'

import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'
import Image from 'next/image'

// Map partner names to their logo filenames
const partnerLogos: Record<string, string> = {
    'Mott Foundation': '/images/patners/Mott.png',
    'KCIC': '/images/patners/KCIC.png',
    'IKEA': '/images/patners/IKEA.png',
    'WWF': '/images/patners/WWF.png',
    // WWF and IKEA Foundation logos not available - will use fallback
}

export function Partners() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
                <RevealHeading className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Our Strategic Partners
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                        Collaborating with leading organizations to drive sustainable impact across East Africa
                    </p>
                </RevealHeading>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {homeContent.partners.map((partner, idx) => {
                        const hasLogo = partnerLogos[partner.name]

                        return (
                            <div
                                key={idx}
                                className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:scale-105 hover:border-dreem-orange/30 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px]"
                            >
                                {hasLogo ? (
                                    <>
                                        {/* Logo Display */}
                                        <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                                            <Image
                                                src={partnerLogos[partner.name]}
                                                alt={`${partner.name} logo`}
                                                fill
                                                className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs font-medium text-dreem-orange dark:text-dreem-orange/90 uppercase tracking-wider">
                                                {partner.role}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Text Fallback for Missing Logos */}
                                        <div className="text-center space-y-3">
                                            <div className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-dreem-orange transition-colors">
                                                {partner.name}
                                            </div>
                                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                {partner.role}
                                            </div>
                                        </div>
                                        {/* Gradient Accent */}
                                        <div className="absolute inset-0 bg-linear-to-br from-dreem-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
