import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-5xl rounded-3xl px-6 py-6 md:py-12 lg:py-20">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Start Trading Smarter Today
          </h2>
          <p className="mt-4">
            Join thousands of traders using AlphaWealth to access real-time
            market data. Take control of your crypto journey now.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/console/dashboard">
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WalletCallToAction() {
  return (
    <section className="py-8">
      <div className="mx-auto flex items-center justify-between gap-16 max-w-5xl rounded-3xl px-6 py-3 md:py-6 lg:py-12">
        <div>
          <h2 className="text-balance text-3xl font-semibold lg:text-4xl">
            Find out why 200M people already trust our wallet.
          </h2>
          <p className="mt-4">
            Join thousands of traders using AlphaWealth to access real-time
            market data. Take control of your crypto journey now.
          </p>

          <div className="mt-4 max-w-fit">
            <Button asChild>
              <Link href="/">
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block mx-18">
          <Image
            src="/CTA-Globe.png"
            alt="Wallet CTA Icon"
            width={664}
            height={664}
          />
        </div>
      </div>
    </section>
  );
}

export function SwapCallToAction() {
  return (
    <section className="py-8">
      <div className="mx-auto flex items-center justify-between gap-16 max-w-5xl border bg-muted rounded-3xl px-6 py-3 md:py-6 lg:py-12">
        <div>
          <h2 className="text-balance text-3xl font-semibold lg:text-4xl">
            Find out why 200M people already trust our wallet.
          </h2>
          <p className="mt-4">
            Join thousands of traders using AlphaWealth to access real-time
            market data. Take control of your crypto journey now.
          </p>

          <div className="mt-4 max-w-fit">
            <Button asChild>
              <Link href="/">
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block mx-18">
          <Image
            src="/CTA-Globe.png"
            alt="Wallet CTA Icon"
            width={664}
            height={664}
          />
        </div>
      </div>
    </section>
  );
}
