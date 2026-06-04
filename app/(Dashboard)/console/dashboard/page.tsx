import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import SectionCardsWrapper from "@/components/section-card-wrapper";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-6 px-6 pt-12 md:px-8 md:pt-18 md:gap-8 md:py-8">
          <SectionCardsWrapper />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
