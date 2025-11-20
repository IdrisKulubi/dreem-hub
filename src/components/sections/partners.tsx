'use client'

import { homeContent } from '@/data/home-content'
import { RevealHeading } from '@/components/ui/reveal-heading'

export function Partners() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
            <div className="container px-4 sm:px-6">
                <RevealHeading className="text-center mb-12">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 opacity-80">
                        Our Strategic Partners
                    </h2>
                </RevealHeading>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {homeContent.partners.map((partner, idx) => (
                        <div key={idx} className="text-center group cursor-default">
                            <div className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-dreem-orange transition-colors">
                                {partner.name}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {partner.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
