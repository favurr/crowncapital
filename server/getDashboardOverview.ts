"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getCryptoPrices } from "@/server/getCryptoPrices";
import { headers } from "next/headers";

export async function getDashboardOverview() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      capital: true,
      accumulativeBalance: true,
      bonus: true,
      profit: true,
      cryptoPlan: true,
      tradeStatus: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const prices = await getCryptoPrices();

  return {
    capitalBTC: user.capital * prices.BTC,
    capitalUSD: user.capital,

    accumulativeBTC: user.accumulativeBalance * prices.BTC,
    accumulativeUSD: user.accumulativeBalance,

    bonusBTC: user.bonus,

    profitBTC: user.profit * prices.BTC,
    profitUSD: user.profit,

    tradeStatus: user.tradeStatus,
    cryptoPlan: user.cryptoPlan,
  };
}
