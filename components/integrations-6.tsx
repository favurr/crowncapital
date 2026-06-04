import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function IntegrationsSection() {
  return (
    <section>
      <div className="bg-background py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-md px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
            <div className="bg-background dark:bg-muted/50 rounded-xl border px-6 pb-12 pt-3 shadow-xl">
              <Integration
                icon={<UserRound />}
                name="Day Trading"
                description="High-frequency strategies focused on short-term price movements and quick entries/exits within a single trading day."
                profit={1000.86}
              />
              <Integration
                icon={<UserRound />}
                name="Swing Trading"
                description="Medium-term approach capturing price swings over days to weeks using technical patterns and momentum signals."
                profit={3000.46}
              />
              <Integration
                icon={<UserRound />}
                name="Positional Trading"
                description="Longer-term strategy holding positions for weeks to months, driven by fundamental analysis and macro trends."
                profit={2586.0}
              />
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">
              Find suitable traders to copy
            </h2>
            <p className="text-muted-foreground">
              Choose experienced traders, copy them, and sit back while they do
              all the work. Your investment portfolio will grow with every
              successful trade, while you save your time and effort.
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="#">Copy Traders</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
  profit,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  profit: number;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="">
          <h3 className="text-sm font-medium">{name}</h3>
          <span className="text-green-300 text-xs">{profit}% </span>
          <span className="text-muted-foreground text-xs">Return rate</span>
        </div>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
      <Button aria-label="Add integration">
        <Link href="#" className="flex items-center gap-2">
          {" "}
          <span>Invest</span>
        </Link>
      </Button>
    </div>
  );
};

export function WalletIntegrationsSection() {
  return (
    <section>
      <div className="pb-24 pt-24 md:pb-32 md:pt-4">
        <div className="mx-auto max-w-5xl px-6">
          <div className="aspect-16/10 group relative mx-auto flex max-w-[22rem] items-center justify-between sm:max-w-sm">
            <div
              role="presentation"
              className="bg-linear-to-b border-foreground/5 absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t from-lime-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100 dark:from-white/5"
            ></div>
            <div
              role="presentation"
              className="bg-linear-to-b border-foreground/5 absolute inset-16 z-10 aspect-square scale-90 animate-spin items-center justify-center rounded-full border-t from-blue-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"
            ></div>
            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t to-transparent to-25%">
              <IntegrationCard className="-translate-x-1/6 absolute left-0 top-1/4 -translate-y-1/4">
                <Image
                  src="/Blockchains/bnb.png"
                  alt="Binance"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
              <IntegrationCard className="absolute top-0 -translate-y-1/2">
                <Image
                  src="/Blockchains/btc.png"
                  alt="Bitcoin"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
              <IntegrationCard className="translate-x-1/6 absolute right-0 top-1/4 -translate-y-1/4">
                <Image
                  src="/Blockchains/eth.png"
                  alt="Ethereum"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
            </div>
            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t to-transparent to-25%">
              <IntegrationCard className="absolute top-0 -translate-y-1/2">
                <Image
                  src="/Blockchains/sol.png"
                  alt="Solana"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
              <IntegrationCard className="absolute left-0 top-1/4 -translate-x-1/4 -translate-y-1/4">
                <Image
                  src="/Blockchains/sui.png"
                  alt="Sui"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
              <IntegrationCard className="absolute right-0 top-1/4 -translate-y-1/4 translate-x-1/4">
                <Image
                  src="/Blockchains/usdt.png"
                  alt="Tether"
                  width={50}
                  height={50}
                />
              </IntegrationCard>
            </div>
            <div className="absolute inset-x-0 bottom-0 mx-auto my-2 flex w-fit justify-center gap-2">
              <div className="bg-muted relative z-20 rounded-full border p-1">
                <IntegrationCard
                  className="shadow-black-950/10 dark:bg-background size-16 border-black/20 shadow-xl dark:border-white/25 dark:shadow-white/15"
                  isCenter={true}
                >
                  <Image src="/favicon.png" alt="Logo" width={48} height={48} />
                </IntegrationCard>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-t from-background relative z-20 mx-auto mt-12 max-w-lg space-y-6 from-55% text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Supported blockchains
            </h2>
            <p className="text-muted-foreground">
              Explore 100+ blockchain networks - with more added regularly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  position?:
    | "left-top"
    | "left-middle"
    | "left-bottom"
    | "right-top"
    | "right-middle"
    | "right-bottom";
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative z-30 flex size-12 rounded-full border bg-white shadow-sm shadow-black/5 dark:bg-white/5 dark:backdrop-blur-md",
        className,
      )}
    >
      <div className={cn("m-auto size-fit *:size-5", isCenter && "*:size-8")}>
        {children}
      </div>
    </div>
  );
};
