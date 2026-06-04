import { getDashboardOverview } from "@/server/getDashboardOverview";
import SectionCards from "./section-cards";

export default async function SectionCardsWrapper() {
  const data = await getDashboardOverview();

  return <SectionCards data={data} />;
}
