import Hero from "@/components/organisms/hero/page";
import HeroSection from "@/components/organisms/hero-section/page";
import { FeaturesSection } from "@/components/organisms/feature-section/page";
import { StatsSection } from "@/components/organisms/stats-section/page";
import { CtaSection } from "@/components/organisms/cta-section/page";
import { Footer } from "@/components/organisms/footer/page";

export const TopPageLayout = () => {

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 text-gray-900">
      <HeroSection />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </div>
    </>
  );
}