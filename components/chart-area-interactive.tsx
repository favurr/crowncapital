import { Suspense } from "react";
import CoinOverview from "./home/coin-overview";
import { CoinOverviewFallback, TrendingCoinsFallback } from "./home/fallback";
import TrendingCoins from "./home/trending-coins";

export const description = "An interactive area chart";

export async function ChartAreaInteractive() {
  return (
    <>
      <div className="home-grid flex flex-col gap-6 px-2 md:px-4 md:gap-8">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
       
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </div>
    </>
  );
}
