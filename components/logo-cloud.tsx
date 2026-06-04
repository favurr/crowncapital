import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  Book,
  Megaphone,
  Globe,
  ShieldCheck,
  ChartNetwork,
} from "lucide-react";
import Image from "next/image";

export function LogoCloud1() {
  return (
    <section className="bg-background dark:bg-background py-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-x-16 gap-y-8 sm:gap-x-10 sm:gap-y-12">
          <div className="flex flex-col items-center max-w-2xs text-center">
            <Book className="h-10 w-10 mb-2" />
            <span className="">committed to forex</span>
            <span>education</span>
          </div>
          <div className="flex flex-col items-center max-w-2xs text-center">
            <Megaphone className="h-10 w-10 mb-2" />
            <span className="">globally licensed and</span>
            <span>regulated</span>
          </div>
          <div className="flex flex-col items-center max-w-2xs text-center">
            <Globe className="h-10 w-10 mb-2" />
            <span className="">24/5 customer</span>
            <span>support</span>
          </div>
          <div className="flex flex-col items-center max-w-2xs text-center">
            <ShieldCheck className="h-10 w-10 mb-2" />
            <span className="">secure and reliable</span>
            <span>trading</span>
          </div>
          <div className="flex flex-col items-center max-w-2xs text-center">
            <ChartNetwork className="h-10 w-10 mb-2" />
            <span className="">fast execution and</span>
            <span>low latency</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LogoCloud3() {
  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Trusted Partners We Work With</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={50} gap={112}>
              <div className="flex">
                <Image
                  className="mx-auto w-fit invert"
                  src="/logo cloud/CG-Wordmark.png"
                  alt="Coin Gecko Logo"
                  height="24"
                  width="24"
                />
              </div>

              <div className="flex">
                <Image
                  className="mx-auto h-4 w-fit invert"
                  src="/logo cloud/CB-Wordmark.png"
                  alt="Coinbase Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-4 w-fit"
                  src="/logo cloud/Bybit-Wordmark.png"
                  alt="ByBit Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-5 w-fit"
                  src="/logo cloud/airswap-4.svg"
                  alt="Airswap Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto w-fit"
                  src="/logo cloud/bitmex.svg"
                  alt="Bitmex Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-4 w-fit"
                  src="/logo cloud/binance.svg"
                  alt="binance Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-7 w-fit"
                  src="/logo cloud/okex-1.svg"
                  alt="Okex Logo"
                  height="24"
                  width="24"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-6 w-fit"
                  src="/logo cloud/TW-Wordmark.png"
                  alt="Trust Wallet Logo"
                  height="24"
                  width="24"
                />
              </div>
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
