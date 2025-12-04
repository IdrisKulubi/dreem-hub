'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from '@/components/ui/sheet'

const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 dark:bg-slate-950/90'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="container px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-50">
                    <Image
                        src="/logo.png"
                        alt="DREEM Hub"
                        width={140}
                        height={40}
                        priority
                        className="h-10 w-auto"
                    />
                    <span className="sr-only">DREEM Hub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-dreem-orange',
                                isScrolled
                                    ? 'text-slate-700 dark:text-slate-200'
                                    : 'text-white/90 hover:text-white'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button
                        className={cn(
                            "transition-all",
                            isScrolled
                                ? "bg-dreem-orange hover:bg-dreem-orange-dark text-white"
                                : "bg-white text-dreem-orange hover:bg-white/90"
                        )}
                    >
                        Get Involved
                    </Button>
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className={cn(
                            isScrolled ? "text-slate-900 dark:text-white" : "text-white hover:bg-white/10 hover:text-white"
                        )}>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetTitle className="text-left text-lg font-bold mb-6">
                            DREEM<span className="text-dreem-orange">Hub</span>
                        </SheetTitle>
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <SheetClose asChild key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'text-lg font-medium transition-colors hover:text-dreem-orange py-2 border-b border-slate-100 dark:border-slate-800',
                                            pathname === item.href ? 'text-dreem-orange' : 'text-slate-600 dark:text-slate-400'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </SheetClose>
                            ))}
                            <div className="pt-4">
                                <SheetClose asChild>
                                    <Button className="w-full bg-dreem-orange hover:bg-dreem-orange-dark text-white">
                                        Get Involved
                                    </Button>
                                </SheetClose>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
