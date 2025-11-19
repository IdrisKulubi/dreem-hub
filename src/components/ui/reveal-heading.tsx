'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function RevealHeading({ children, className = '', delay = 0 }: RevealHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    gsap.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        once: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [delay])

  return (
    <div ref={headingRef} className={className}>
      {children}
    </div>
  )
}
