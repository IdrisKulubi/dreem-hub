import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden" role="contentinfo">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-dreem-orange/5 to-transparent pointer-events-none" />

      <div className="relative container px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block group" aria-label="DREEM Hub home page">
              <Image
                src="/logo.png"
                alt="DREEM Hub"
                width={160}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Distributed Renewable Energy Ecosystem Model - Solarizing agricultural value chains across East Africa.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-slate-800/50 hover:bg-dreem-orange/10 border border-slate-700/50 hover:border-dreem-orange/50 transition-all duration-300"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-dreem-orange transition-colors duration-300" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-slate-800/50 hover:bg-dreem-orange/10 border border-slate-700/50 hover:border-dreem-orange/50 transition-all duration-300"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-dreem-orange transition-colors duration-300" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-slate-800/50 hover:bg-dreem-orange/10 border border-slate-700/50 hover:border-dreem-orange/50 transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5 text-slate-400 group-hover:text-dreem-orange transition-colors duration-300" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col space-y-3" aria-label="Footer navigation">
              <Link href="/#impact" className="text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200 inline-flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-dreem-orange transition-all duration-200 mr-0 group-hover:mr-2"></span>
                Our Impact
              </Link>
              <Link href="/#model" className="text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200 inline-flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-dreem-orange transition-all duration-200 mr-0 group-hover:mr-2"></span>
                The Model
              </Link>
              <Link href="/#regional-focus" className="text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200 inline-flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-dreem-orange transition-all duration-200 mr-0 group-hover:mr-2"></span>
                Regional Focus
              </Link>
              <Link href="/#value-chains" className="text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200 inline-flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-dreem-orange transition-all duration-200 mr-0 group-hover:mr-2"></span>
                Value Chains
              </Link>
              <Link href="/#partners" className="text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200 inline-flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-dreem-orange transition-all duration-200 mr-0 group-hover:mr-2"></span>
                Partners
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Contact</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:info@dreemhub.org"
                className="group flex items-start gap-3 text-sm text-slate-400 hover:text-dreem-orange transition-colors duration-200"
                aria-label="Send email to info@dreemhub.org"
              >
                <Mail className="h-5 w-5 mt-0.5 text-slate-500 group-hover:text-dreem-orange transition-colors duration-200 shrink-0" aria-hidden="true" />
                <span>info@dreemhub.org</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 mt-0.5 text-slate-500 shrink-0" aria-hidden="true" />
                <span>East Africa Region<br />Kenya • Uganda • Tanzania</span>
              </div>
            </div>
          </div>

          {/* Newsletter/CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get the latest news on solar energy adoption in East African agriculture.
            </p>
            <a
              href="mailto:info@dreemhub.org?subject=Subscribe to DREEM Hub Newsletter"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-dreem-orange/10 hover:bg-dreem-orange text-slate-200 hover:text-white rounded-lg border border-dreem-orange/50 hover:border-dreem-orange transition-all duration-300 text-sm font-medium group"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Subscribe
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} DREEM Hub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-dreem-orange transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-dreem-orange transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
