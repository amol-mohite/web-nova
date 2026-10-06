import { HeroSection } from '@/components/HeroSection';
import { TrustStrip } from '@/components/TrustStrip';
import { ServicesSection } from '@/components/ServicesSection';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { CTASection } from '@/components/CTASection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <PortfolioSection />
      <WhatWeDoSection />
      <CTASection />
    </>
  );
}
