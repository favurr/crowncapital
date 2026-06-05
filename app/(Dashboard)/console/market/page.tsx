import Categories from "@/components/home/categories";
import { CategoriesFallback } from "@/components/home/fallback";
import MarketOverview from "@/components/tradingview/market-overview";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-6 pt-6 md:px-8 md:pt-8 md:gap-8 md:pb-4">
          <Suspense fallback={<CategoriesFallback />}>
            <Categories />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
