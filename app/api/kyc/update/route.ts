import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session?.user?.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    gender,
    countryCode,
    country,
    phoneNumber,
    documentId,
    password,
    idFrontImage,
    idBackImage,
  } = body;

  try {
    const kyc = await prisma.kyc.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        gender,
        countryCode,
        country,
        phoneNumber,
        documentId,
        password,
        idFrontImage,
        idBackImage,
      },
      update: {
        gender,
        countryCode,
        country,
        phoneNumber,
        documentId,
        password,
        idFrontImage,
        idBackImage,
      },
    });

    return NextResponse.json({ success: true, kyc });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update KYC" },
      { status: 500 },
    );
  }
}
