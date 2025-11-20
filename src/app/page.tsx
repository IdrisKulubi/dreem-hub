import { Hero } from "@/components/sections/hero";
import { ImpactCounter } from "@/components/sections/impact-counter";
import { CountryCards } from "@/components/sections/country-cards";
import { AboutMission } from "@/components/sections/about-mission";
import { Footer } from "@/components/layout/footer";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { ScrollGradientBackground } from "@/components/layout/scroll-gradient-background";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative">
      <ScrollGradientBackground />
      {/* Hero Section */}
      <Hero />

      {/* Impact Counter Section */}
      <ImpactCounter />

      {/* Country Cards Section */}
      <section className="py-12 sm:py-16 md:py-20" aria-labelledby="country-programs-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <RevealHeading className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 id="country-programs-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Our Country Programs
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Tailored solar energy solutions for agricultural value chains across East Africa
            </p>
          </RevealHeading>
          <CountryCards />
        </div>
      </section>

      {/* About/Mission Section */}
      <AboutMission />

      {/* Footer */}
      <Footer />
    </main>
  );
}