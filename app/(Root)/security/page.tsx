// app/(Root)/security/page.tsx
import { Shield, Lock, Key, CheckCircle } from "lucide-react";
import { FaqsSection } from "@/components/faqs-section";
import CallToAction from "@/components/call-to-action";

export default function SecurityPage() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-balance text-4xl font-medium md:text-5xl">
            Security & Trust
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We treat security as a feature — from rigorous audits and strict
            access controls to encryption and industry best practices. Your
            funds and data are protected at every layer.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background size-10 grid place-items-center">
                  <Shield className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  Enterprise-grade Encryption
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                All data is encrypted at rest and in transit using modern
                cryptography and rotated keys.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background size-10 grid place-items-center">
                  <Key className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  Cold Storage & Key Management
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Assets are held using hardened key management procedures and
                segregated cold-storage to minimize exposure.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background size-10 grid place-items-center">
                  <Lock className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">Access Controls & 2FA</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Strong access controls, role-based permissions, and two-factor
                authentication protect accounts and sensitive actions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background size-10 grid place-items-center">
                  <CheckCircle className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">Audits & Monitoring</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Regular third-party audits, automated monitoring, and incident
                response processes ensure continuous reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-semibold mb-4">Security Practices</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Periodic pentests and external security reviews</li>
            <li>Multi-signature custody for large funds</li>
            <li>Continuous monitoring and anomaly detection</li>
            <li>Transparent reporting & security disclosures</li>
          </ul>
        </div>
      </section>

      <FaqsSection />

      <CallToAction />
    </main>
  );
}
