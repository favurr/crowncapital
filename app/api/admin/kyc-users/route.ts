import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      kyc: {
        select: {
          gender: true,
          countryCode: true,
          country: true,
          phoneNumber: true,
          documentId: true,
          idFrontImage: true,
          idBackImage: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    where: { role: "USER" },
  });

  return NextResponse.json(users);
}
