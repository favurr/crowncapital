"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TransactionType } from "@/generated/prisma/enums";
import { headers } from "next/headers";

export async function createDepositHistory({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.history.create({
    data: {
      userId: session.user.id,
      amount,
      currency,
      type: TransactionType.PENDING,
    },
  });
}
