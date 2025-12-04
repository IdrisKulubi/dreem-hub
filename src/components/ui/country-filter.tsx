'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const countries = ['All', 'Kenya', 'Uganda', 'Tanzania']

export function CountryFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCountry = searchParams.get('country') || 'All'

    const handleFilter = (country: string) => {
        const params = new URLSearchParams(searchParams)
        if (country === 'All') {
            params.delete('country')
        } else {
            params.set('country', country)
        }
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
            {countries.map((country) => (
                <Button
                    key={country}
                    variant={currentCountry === country ? 'default' : 'outline'}
                    onClick={() => handleFilter(country)}
                    className={cn(
                        "rounded-full px-6 transition-all",
                        currentCountry === country
                            ? "bg-dreem-orange hover:bg-dreem-orange-dark text-white border-transparent"
                            : "hover:border-dreem-orange hover:text-dreem-orange"
                    )}
                >
                    {country}
                </Button>
            ))}
        </div>
    )
}
