import { WalletCallToAction } from "@/components/call-to-action";
import { WalletFeatures } from "@/components/features-1";
import { WalletHeroSection } from "@/components/hero-section";
import { WalletIntegrationsSection } from "@/components/integrations-6";

const page = () => {
  return (
    <main className="">
      <WalletHeroSection />
      <WalletIntegrationsSection />
      <WalletFeatures />
      <WalletCallToAction />
    </main>
  );
};

export default page;
