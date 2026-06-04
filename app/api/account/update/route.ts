import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, image, phoneNumber, country } = await req.json();

  try {
    // Update user table
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image,
      },
    });

    // Upsert KYC
    await prisma.kyc.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        phoneNumber,
        country,
      },
      update: {
        phoneNumber,
        country,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update account" },
      { status: 500 },
    );
  }
}
