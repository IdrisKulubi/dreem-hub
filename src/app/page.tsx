import { Hero } from "@/components/sections/hero";
import { ImpactCounter } from "@/components/sections/impact-counter";
import { TheModel } from "@/components/sections/the-model";
import { RegionalFocus } from "@/components/sections/regional-focus";
import { ValueChainShowcase } from "@/components/sections/value-chain-showcase";
import { Partners } from "@/components/sections/partners";
import { Footer } from "@/components/layout/footer";
import { ScrollGradientBackground } from "@/components/layout/scroll-gradient-background";

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <ScrollGradientBackground />

      {/* Hero Section */}
      <Hero />

      {/* Impact Snapshot - Immediate Proof */}
      <ImpactCounter />

      {/* The Model - How it works (Hub & Spoke) */}
      <TheModel />

      {/* Regional Focus - Deep dive into Kenya, Tanzania, Uganda */}
      <RegionalFocus />

      {/* Value Chains - Specific Technologies */}
      <ValueChainShowcase />

      {/* Partners - Trust Signals */}
      <Partners />

      {/* Footer */}
      <Footer />
    </main>
  );
}