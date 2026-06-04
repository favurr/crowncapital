"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/generated/prisma/enums";

export async function transferFunds({
  recipientSuffix,
  amount,
  pin,
}: {
  recipientSuffix: string;
  amount: number;
  pin: string;
}) {
  // 1. Resolve session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // 2. Validate PIN (hard-block for now)
  if (pin !== process.env.NEXT_PUBLIC_WITHDRAWAL_PIN) {
    throw new Error("INVALID_PIN");
  }

  // 3. Resolve recipient by last 8 chars
  const recipient = await prisma.user.findFirst({
    where: {
      id: {
        endsWith: recipientSuffix,
      },
    },
  });

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  // 4. Create history record (sender)
  await prisma.history.create({
    data: {
      userId: session.user.id,
      currency: "USD",
      amount,
      type: TransactionType.TRANSFERRED,
    },
  });

  // (Optional later)
  // - decrement sender balance
  // - increment recipient balance
  // - wrap in a transaction

  return { success: true };
}
