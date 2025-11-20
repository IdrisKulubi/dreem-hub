'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollGradientBackground() {
    useEffect(() => {
        const layers = [
            document.getElementById('bg-layer-1'),
            document.getElementById('bg-layer-2'),
            document.getElementById('bg-layer-3')
        ]

        if (!layers[0] || !layers[1] || !layers[2]) return

        // Initial state
        gsap.set(layers[0], { opacity: 1 })
        gsap.set(layers[1], { opacity: 0 })
        gsap.set(layers[2], { opacity: 0 })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            }
        })

        // Transition to Blue (Layer 2) around 30% scroll
        tl.to(layers[0], { opacity: 0, duration: 1 }, 'start')
            .to(layers[1], { opacity: 1, duration: 1 }, 'start')

            // Transition to Dark (Layer 3) around 80% scroll
            .to(layers[1], { opacity: 0, duration: 1 }, 'end')
            .to(layers[2], { opacity: 1, duration: 1 }, 'end')

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <div className="absolute inset-0" id="bg-layer-1"
                style={{ background: 'linear-gradient(135deg, rgba(233,116,81,0.15) 0%, rgba(255,255,255,0) 100%)' }} />
            <div className="absolute inset-0" id="bg-layer-2"
                style={{ background: 'linear-gradient(135deg, rgba(0,173,221,0.15) 0%, rgba(255,255,255,0) 100%)' }} />
            <div className="absolute inset-0" id="bg-layer-3"
                style={{ background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(0,0,0,1) 100%)' }} />
        </div>
    )
}
