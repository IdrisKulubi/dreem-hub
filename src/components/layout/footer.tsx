import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100" role="contentinfo">
      <div className="container px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start sm:items-center">
          {/* Logo/Brand Section */}
          <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
            <Link href="/" className="inline-block" aria-label="DREEM Hub home page">
              <h2 className="text-xl sm:text-2xl font-bold text-dreem-orange">DREEM Hub</h2>
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-snug">
              Distributed Renewable Energy Ecosystem Model
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-2 sm:space-y-3 text-center">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-200">Get in Touch</h3>
            <a
              href="mailto:info@dreemhub.org"
              className="text-xs sm:text-sm text-slate-300 hover:text-dreem-orange transition-colors inline-block break-all"
              aria-label="Send email to info@dreemhub.org"
            >
              info@dreemhub.org
            </a>
          </div>

          {/* Social Media Section */}
          <nav className="space-y-2 sm:space-y-3 text-center md:text-right" aria-label="Social media links">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-200">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4 justify-center md:justify-end">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-dreem-orange transition-all duration-300 hover:scale-110"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-dreem-orange transition-all duration-300 hover:scale-110"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-dreem-orange transition-all duration-300 hover:scale-110"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800">
          <p className="text-center text-xs sm:text-sm text-slate-400">
            © {currentYear} DREEM Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
