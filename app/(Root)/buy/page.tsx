// app/(Root)/buy/page.tsx
import CallToAction from "@/components/call-to-action";
import BuyForm from "@/components/buy-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function BuyPage() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-balance text-4xl font-medium md:text-5xl">
              Buy Crypto
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Buy BTC, ETH, USDT and more using a variety of payment methods.
              Secure, fast, and integrated with our platform so funds appear in
              your account promptly after confirmation.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold">Fast settlements</h3>
                <p className="text-muted-foreground text-sm">
                  Most crypto payments are reflected in your account after a few
                  network confirmations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Multiple payment methods</h3>
                <p className="text-muted-foreground text-sm">
                  Choose between crypto transfers, bank transfers, PayPal and
                  other supported methods.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <div className="mx-auto max-w-md rounded-2xl border bg-background p-6 shadow">
              <h2 className="mb-4 text-lg font-medium">Make a deposit</h2>
              <BuyForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-semibold mb-4">How it works</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Buying crypto on our platform is secure and straightforward. Pick an
            asset and amount, choose a payment method, follow the guided steps,
            and your balance will update once the transaction is confirmed
            on-chain or by the payment provider.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      1
                    </div>
                    <CardTitle>Choose asset & amount</CardTitle>
                  </div>
                  <CardDescription>
                    Select from popular tokens (BTC, ETH, USDT) or search for
                    other supported assets and enter how much you'd like to buy.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      2
                    </div>
                    <CardTitle>Select payment method</CardTitle>
                  </div>
                  <CardDescription>
                    Use crypto transfers, bank transfers, or supported
                    third-party providers. We show expected fees and estimated
                    arrival times.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      3
                    </div>
                    <CardTitle>Confirm & receive</CardTitle>
                  </div>
                  <CardDescription>
                    Review details and confirm the payment. Funds appear in your
                    wallet after required confirmations or provider settlement.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <a href="/support/buy">Learn how to buy</a>
            </Button>
            <Button asChild size="sm">
              <a href="/console/dashboard">View your wallet</a>
            </Button>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">
              Frequently asked questions
            </h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>
                  How long until funds appear?
                </AccordionTrigger>
                <AccordionContent>
                  Most on-chain transfers require a few confirmations before
                  appearing; card or provider-based methods depend on the
                  provider's settlement times, which we show during checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  Which payment methods are supported?
                </AccordionTrigger>
                <AccordionContent>
                  We support crypto transfers, bank transfers, and selected
                  third-party processors (availability varies by region). You
                  can see applicable options for your country at checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>Are there limits or fees?</AccordionTrigger>
                <AccordionContent>
                  We display any fees and limits before you confirm a purchase.
                  For higher limits or special payment methods, KYC verification
                  may be required.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
