import { formatCurrency } from "@/lib/utils";
import { fetcher } from "@/server/coingecko.actions";
import Image from "next/image";
import { CoinOverviewFallback } from "./fallback";
import CandlestickChart from "../reusables/candlestick-chart";

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      await fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }, 60, true),

      await fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
      }, 60, true),
    ]);

    if (!coin) {
      return <CoinOverviewFallback />;
    }

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData ?? undefined} coinId="bitcoin">
          <div className="header pt-2">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error("CoinOverview fetch failed", error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
