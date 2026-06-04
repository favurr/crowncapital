import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Suspense } from "react";
import CoinOverview from "./home/coin-overview";
import NewTradeForm from "./new-trade-form";

export const description = "An interactive area chart";

export async function ChartAreaInteractive() {
  return (
    <>
      <div className="home-grid">
        <p>add chart</p>
        <Card className="@container/card ">
          <CardHeader>
            <CardTitle>New Trade</CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <NewTradeForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
