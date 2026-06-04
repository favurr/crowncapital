"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex gap-8">
          {/* Main content */}
          <div className="flex-1">
            <header className="mb-8 md:mb-12 bg-primary rounded-4xl">
              <div className="p-6 md:p-16 text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                  Alpha Wealth <br />
                  Privacy Policy
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Last updated: November 24, 2025
                </p>
              </div>
            </header>

            <div className="relative">
              <div>
                <article className="prose max-w-none dark:prose-invert flex flex-col gap-1 sm:gap-2 md:gap-4">
                  <p>
                    Your privacy is important to us. This Privacy Policy
                    describes the types of information we collect, how we use
                    it, the choices you have regarding your information, and the
                    steps we take to protect it when you use AlphaWealth ("the
                    Service"). By using the Service you agree to the collection
                    and use of information in accordance with this policy.
                  </p>

                  <h2 className="font-bold mt-4">Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as
                    when you create an account, update your profile, or contact
                    support. This may include your name, email address, billing
                    details, and any other information you choose to provide. We
                    also automatically collect certain technical information
                    when you interact with the Service, including your IP
                    address, device and browser information, and usage data.
                  </p>

                  <h2 className="font-bold mt-4">
                    How We Use Your Information
                  </h2>
                  <p>
                    We use the information we collect to provide, maintain, and
                    improve the Service, personalise your experience, process
                    transactions, communicate with you about updates and offers,
                    and for fraud prevention and security. Where required, we
                    will obtain your consent before using your information for
                    other purposes.
                  </p>

                  <h2 className="font-bold mt-4">Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar technologies to collect
                    information about activity on our site and to remember your
                    preferences. You can control cookies through your browser
                    settings and other tools; however, disabling cookies may
                    affect the functionality of the Service.
                  </p>

                  <h2 className="font-bold mt-4">Sharing and Disclosure</h2>
                  <p>
                    We do not sell your personal information. We may share
                    information with service providers who perform services on
                    our behalf, such as payment processors, analytics providers,
                    and hosting companies. We may also disclose information when
                    required by law or to protect our rights, safety, or
                    property.
                  </p>

                  <h2 className="font-bold mt-4">Security</h2>
                  <p>
                    We take reasonable administrative, technical, and physical
                    measures designed to protect your information. No method of
                    transmission over the internet or electronic storage is
                    completely secure; therefore we cannot guarantee absolute
                    security.
                  </p>

                  <h2 className="font-bold mt-4">Your Rights and Choices</h2>
                  <p>
                    Depending on your jurisdiction, you may have rights to
                    access, correct, or delete your personal information, or to
                    restrict or object to processing. To exercise these rights
                    please contact us using the details provided below. We will
                    respond to verifiable requests in accordance with applicable
                    law.
                  </p>

                  <h2 className="font-bold mt-4">Children's Privacy</h2>
                  <p>
                    The Service is not intended for children under 13. We do not
                    knowingly collect personal information from children under
                    the applicable minimum age. If you believe we have collected
                    information from a child, please contact us and we will take
                    steps to remove the information.
                  </p>

                  <h2 className="font-bold mt-4">Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. When we
                    do we will revise the "Last updated" date at the top of the
                    policy and, where appropriate, notify you of significant
                    changes. Continued use of the Service after changes
                    indicates your acceptance of the revised policy.
                  </p>

                  <h2 className="font-bold mt-4">
                    GDPR (European Economic Area)
                  </h2>
                  <p>
                    If you are located in the European Economic Area (EEA), the
                    General Data Protection Regulation (GDPR) provides certain
                    rights in relation to your personal data. We act as the data
                    controller for the personal data we collect through the
                    Service. Under the GDPR you have the right to:
                  </p>
                  <ul>
                    <li>
                      Request access to the personal data we hold about you.
                    </li>
                    <li>
                      Request correction of inaccurate or incomplete data.
                    </li>
                    <li>
                      Request deletion of your personal data (the "right to be
                      forgotten") where legal grounds permit.
                    </li>
                    <li>
                      Request restriction of processing or object to processing
                      where applicable.
                    </li>
                    <li>
                      Request portability of your data in a commonly used,
                      machine-readable format.
                    </li>
                  </ul>
                  <p>
                    Lawful bases for processing include performance of a
                    contract, compliance with legal obligations, legitimate
                    interests, and where you consent. Where we rely on consent,
                    you can withdraw consent at any time. If we transfer
                    personal data outside the EEA, we do so using appropriate
                    safeguards such as Standard Contractual Clauses or other
                    lawful transfer mechanisms.
                  </p>

                  <h2 className="font-bold mt-4">
                    CCPA (California Residents)
                  </h2>
                  <p>
                    If you are a resident of California, the California Consumer
                    Privacy Act (CCPA) provides additional rights regarding your
                    personal information. Subject to certain exceptions,
                    California residents have the right to:
                  </p>
                  <ul>
                    <li>
                      Request disclosure of categories and specific pieces of
                      personal information we have collected about you.
                    </li>
                    <li>
                      Request deletion of personal information we have collected
                      about you, subject to certain exceptions.
                    </li>
                    <li>
                      Opt-out of the sale of personal information (we do not
                      currently sell personal information; if that changes we
                      will provide a clear opt-out mechanism).
                    </li>
                    <li>
                      Not be discriminated against for exercising the rights
                      provided by the CCPA.
                    </li>
                  </ul>
                  <p>
                    To make a request under the GDPR or CCPA, please contact us
                    at the email address below. We will verify requests to the
                    extent required by applicable law and respond within the
                    timeframes required by law.
                  </p>

                  <h2 className="font-bold mt-4">Contact Us</h2>
                  <p>
                    If you have questions or concerns about this Privacy Policy
                    or our data practices, please <span> </span>
                    <Link className="underline" href="/support">
                      contact us.
                    </Link>
                  </p>
                </article>

                <div className="mt-6">
                  <Button asChild size="lg">
                    <Link href="/" className="text-white">
                      Return Home
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
