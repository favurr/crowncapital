import { Suspense } from "react";
import CoinOverview from "./home/coin-overview";
import { CoinOverviewFallback, TrendingCoinsFallback } from "./home/fallback";
import TrendingCoins from "./home/trending-coins";

export const description = "An interactive area chart";

export async function ChartAreaInteractive() {
  return (
    <>
      <div className="home-grid">
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
