import Features from "@/components/features-1";
import HeroSection from "@/components/hero-section";
import LogoCloud3, { LogoCloud1 } from "@/components/logo-cloud";
import Integrations from "@/components/integrations-6";
import TeamSection from "@/components/team";
import ContentSection from "@/components/content-7";
import StatsSection from "@/components/stats-4";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoCloud1 />
      <Features />
      <ContentSection />
      <StatsSection />
      <Integrations />
      <LogoCloud3 />
      <Testimonials />
      <TeamSection />
      <CallToAction />
    </main>
  );
}
