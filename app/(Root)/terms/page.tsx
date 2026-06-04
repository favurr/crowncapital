"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
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
                  Terms of Service
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
                    Welcome to AlphaWealth. These Terms of Service ("Terms")
                    govern your access to and use of the AlphaWealth website and
                    services (the "Service"). By accessing or using the Service,
                    you agree to be bound by these Terms. If you do not agree to
                    all of these Terms, you should not use the Service.
                  </p>

                  <h2 className="font-bold mt-4">1. Use License</h2>
                  <p>
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) on AlphaWealth for
                    personal, non-commercial transitory viewing only. This is
                    the grant of a license, not a transfer of title, and under
                    this license you may not: modify or copy the materials; use
                    the materials for any commercial purpose or for any public
                    display (commercial or non-commercial); attempt to decompile
                    or reverse engineer any software contained on the Service;
                    remove any copyright or other proprietary notations from the
                    materials; transfer the materials to another person or
                    "mirror" the materials on any other server.
                  </p>

                  <h2 className="font-bold mt-4">2. Disclaimer</h2>
                  <p>
                    The materials on AlphaWealth are provided on an "as is"
                    basis. AlphaWealth makes no warranties, expressed or
                    implied, and hereby disclaims and negates all other
                    warranties including, without limitation, implied warranties
                    or conditions of merchantability, fitness for a particular
                    purpose, or non-infringement of intellectual property or
                    other violation of rights.
                  </p>

                  <h2 className="font-bold mt-4">3. Limitations</h2>
                  <p>
                    In no event shall AlphaWealth or its suppliers be liable for
                    any damages (including, without limitation, damages for loss
                    of data or profit, or due to business interruption) arising
                    out of the use or inability to use the materials on
                    AlphaWealth, even if we or our authorized representative has
                    been notified orally or in writing of the possibility of
                    such damage.
                  </p>

                  <h2 className="font-bold mt-4">4. Accuracy of Materials</h2>
                  <p>
                    The materials appearing on AlphaWealth could include
                    technical, typographical, or photographic errors.
                    AlphaWealth does not warrant that any of the materials on
                    the Service are accurate, complete, or current. AlphaWealth
                    may make changes to the materials contained on the Service
                    at any time without notice.
                  </p>

                  <h2 className="font-bold mt-4">5. Links</h2>
                  <p>
                    AlphaWealth has not reviewed all of the sites linked to its
                    website and is not responsible for the contents of any such
                    linked site. The inclusion of any link does not imply
                    endorsement by AlphaWealth of the site. Use of any such
                    linked website is at the user's own risk.
                  </p>

                  <h2 className="font-bold mt-4">6. Modifications</h2>
                  <p>
                    AlphaWealth may revise these Terms of Service for the
                    Service at any time without notice. By using the Service,
                    you are agreeing to be bound by the then current version of
                    these Terms of Service.
                  </p>

                  <h2 className="font-bold mt-4">7. Governing Law</h2>
                  <p>
                    These terms and conditions are governed by and construed in
                    accordance with the laws of the jurisdiction in which
                    AlphaWealth operates, and you irrevocably submit to the
                    exclusive jurisdiction of the courts in that location.
                  </p>

                  <h2 className="font-bold mt-4">8. User Accounts</h2>
                  <p>
                    If you create an account on the Service, you are responsible
                    for maintaining the confidentiality of your account
                    information and password. You agree to accept responsibility
                    for all activities that occur under your account. You must
                    notify us immediately of any unauthorized use of your
                    account or any other breaches of security.
                  </p>

                  <h2 className="font-bold mt-4">9. Prohibited Conduct</h2>
                  <p>
                    You agree not to use the Service for any unlawful purposes
                    or in any way that could damage, disable, or impair the
                    Service. You may not attempt to gain unauthorized access to
                    any portion or feature of the Service, nor circumvent any
                    security or access control measures.
                  </p>

                  <h2 className="font-bold mt-4">
                    10. Intellectual Property Rights
                  </h2>
                  <p>
                    The Service and all materials therein, including images,
                    text, graphics, logos, button icons, and software, are the
                    property of AlphaWealth or its suppliers and are protected
                    by international copyright laws. You may not reproduce,
                    distribute, transmit, display, or otherwise use any of the
                    materials without prior written permission from AlphaWealth.
                  </p>

                  <h2 className="font-bold mt-4">11. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms of Service,
                    please{" "}
                    <Link className="underline" href="/contact">
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
