import CountUp from "./ui/count-up";

export default function StatsSection() {
  return (
    <section className="py-16 bg-muted md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 max-w-xl space-y-6">
          <h2 className="text-4xl font-medium lg:text-5xl">
            The AlphaWealth ecosystem brings everything together.
          </h2>
          <p>
            More than a trading interface — AlphaWealth{" "}
            <span className="font-semibold">powers a complete ecosystem</span>{" "}
            designed for modern crypto investors.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div>
            <p>
              From intuitive products to powerful APIs and platforms that help
              traders, developers, and businesses grow with confidence.
            </p>
            <div className="mb-12 mt-12 grid grid-cols-2 gap-2 md:mb-0">
              <div className="space-y-4">
                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                  <CountUp value={1200} prefix="+" /> 
                </div>
                <p>Monthly Customers</p>
              </div>
              <div className="space-y-4">
                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                  <CountUp value={500} prefix="+" />
                </div>
                <p>Active Traders</p>
              </div>
            </div>
          </div>
          <div className="relative mt-12 sm:pt-0">
            <blockquote className="border-l-4 pl-4">
              <p>
                Using AlphaWealth feels like unlocking a new level of trading
                clarity. The platform blends simplicity with powerful tools,
                helping us create faster, smarter, and more intuitive crypto
                experiences.
              </p>

              <div className="mt-6 space-y-3">
                <cite className="block font-medium">
                  Alesia Haas, Senior Account Manager
                </cite>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
