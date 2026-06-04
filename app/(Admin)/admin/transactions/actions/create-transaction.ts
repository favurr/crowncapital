"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TransactionType } from "@/generated/prisma/client";

interface CreateTransactionInput {
  userId: string;
  amount: number;
  currency: string;
  type: TransactionType; // Prisma enum here is correct
}

export async function createTransaction({
  userId,
  amount,
  currency,
  type,
}: CreateTransactionInput) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.history.create({
    data: {
      userId,
      amount,
      currency,
      type,
    },
  });

  // 🔥 THIS IS THE KEY
  revalidatePath("/admin/transactions");
}
