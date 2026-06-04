"use server";

import { prisma } from "@/lib/prisma";

export type UpdateUserInput = {
  id: string;
  capital: number;
  accumulativeBalance: number;
  bonus: number;
  profit: number;
  tradeStatus: "LOSS" | "WIN";
  cryptoPlan: "SILVER" | "GOLD" | "DIAMOND" | "ELITE" | "EXCLUSIVE";
};

export async function updateUser(data: UpdateUserInput) {
  return prisma.user.update({
    where: { id: data.id },
    data: {
      capital: data.capital,
      accumulativeBalance: data.accumulativeBalance,
      bonus: data.bonus,
      profit: data.profit,
      tradeStatus: data.tradeStatus,
      cryptoPlan: data.cryptoPlan,
    },
  });
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
  });
}
