import { CTASection } from '@/components/landing/cta';
import { FeaturesSection } from '@/components/landing/features';
import { HeroSection } from '@/components/landing/hero';
import { WorkflowSection } from '@/components/landing/workflow';
import { PricingSection } from '@/components/landing/pricing';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 py-16 md:py-20 lg:py-24">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
