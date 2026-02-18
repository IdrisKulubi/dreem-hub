import { Mail, MapPin } from 'lucide-react'
import { InstagramLogoIcon, YoutubeLogoIcon, TiktokLogoIcon } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Contact Us | DREEM Hub',
  description: 'Get in touch with DREEM Hub - Solarizing agricultural value chains across East Africa.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Connect with us to learn more about DREEM Hub and our work in solarizing agricultural value chains across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">

            {/* Email Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-dreem-orange/10 flex items-center justify-center group-hover:bg-dreem-orange/20 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-dreem-orange" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Email Us
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Send us an email and we&apos;ll get back to you as soon as possible.
                  </p>
                  <a
                    href="mailto:info@dreemhub.org"
                    className="text-dreem-orange hover:text-dreem-orange/80 font-medium transition-colors duration-200"
                  >
                    info@dreemhub.org
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-kcic-blue/10 flex items-center justify-center group-hover:bg-kcic-blue/20 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-kcic-blue" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Our Region
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    We operate across three countries in East Africa.
                  </p>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <p>🇰🇪 Kenya</p>
                    <p>🇺🇬 Uganda</p>
                    <p>🇹🇿 Tanzania</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Follow Our Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Stay connected with us on social media for the latest updates on solar energy adoption in East African agriculture.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/kenya.cic"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-kcic-blue/10 border border-slate-200 dark:border-slate-700 hover:border-kcic-blue/50 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Visit KCIC on Instagram"
              >
                <InstagramLogoIcon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-kcic-blue transition-colors duration-300" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@KenyaClimateInnovationCenter"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-dreem-orange/10 border border-slate-200 dark:border-slate-700 hover:border-dreem-orange/50 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Visit KCIC on YouTube"
              >
                <YoutubeLogoIcon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-dreem-orange transition-colors duration-300" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@kenya.cic"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-kcic-green/10 border border-slate-200 dark:border-slate-700 hover:border-kcic-green/50 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Visit KCIC on TikTok"
              >
                <TiktokLogoIcon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-kcic-green transition-colors duration-300" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto bg-linear-to-br from-dreem-orange/5 to-kcic-blue/5 border-dreem-orange/20 dark:border-dreem-orange/30">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Interested in Partnering?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                We&apos;re always looking for partners who share our vision of sustainable agricultural development through solar energy. Reach out to explore collaboration opportunities.
              </p>
              <a
                href="mailto:info@dreemhub.org?subject=Partnership Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-dreem-orange hover:bg-dreem-orange/90 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                Send Partnership Inquiry
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
