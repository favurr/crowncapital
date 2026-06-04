"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { TransactionTypeFrontend } from "../constants/transaction-types";

export async function updateTransaction({
  id,
  amount,
  currency,
  type,
  userId,
}: {
  id: string;
  amount: number;
  currency: string;
  type: TransactionTypeFrontend;
  userId: string;
}) {
  await prisma.history.update({
    where: { id },
    data: {
      amount,
      currency,
      type,
      userId,
    },
  });

  revalidatePath("/admin/transactions");
}

export async function deleteTransaction(id: string) {
  await prisma.history.delete({
    where: { id },
  });

  revalidatePath("/admin/transactions");
}
