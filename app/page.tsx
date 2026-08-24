import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { EstimatorSection } from "@/components/EstimatorSection";
import { DiscoverySection } from "@/components/DiscoverySection";
import { HowItWorks } from "@/components/HowItWorks";
import { WhySection } from "@/components/WhySection";
import { LocationsSection } from "@/components/LocationsSection";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/rentease/Footer";

export const metadata: Metadata = {
  title: "RentEase — Find a home, know the risk, pay a fair rent",
  description:
    "RentEase combines rental discovery with AI-assisted listing trust assessment and data-driven rent estimation for tenants and landlords across India.",
  openGraph: {
    title: "RentEase — Smart renting, made simple",
    description:
      "Discover rentals, review AI-assisted Trust Scores and compare listed rent with a data-driven estimate.",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustSection />
      <EstimatorSection />
      <DiscoverySection />
      <HowItWorks />
      <WhySection />
      <LocationsSection />
      <ClosingCta />
      <Footer/>
    </main>
  );
}
