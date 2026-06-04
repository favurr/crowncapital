// app/(Root)/about/page.tsx
import ContentSection from "@/components/content-7";
import TeamSection from "@/components/team";
import { FaqsSection } from "@/components/faqs-section";
import CallToAction from "@/components/call-to-action";

export default function AboutPage() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-balance text-4xl font-medium md:text-5xl">
            About AlphaWealth
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            AlphaWealth builds intuitive trading products powered by advanced
            algorithms and real-time market data. We help traders and teams
            access professional tools with simple onboarding and transparent
            experiences.
          </p>
        </div>
      </section>

      <ContentSection />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe in empowering traders and developers with reliable
            infrastructure, clear analytics, and a community-driven approach to
            innovation.
          </p>
        </div>
      </section>

      <TeamSection />

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-semibold mb-4">How we operate</h2>
          <p className="text-muted-foreground">
            Security and simplicity are at the core of everything we build —
            from custody options to algorithmic strategies and developer
            tooling.
          </p>
        </div>
      </section>

      <FaqsSection />

      <CallToAction />
    </main>
  );
}
