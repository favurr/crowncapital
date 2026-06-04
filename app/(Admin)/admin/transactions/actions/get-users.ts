"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return users;
}
