import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { type, provider, details } = body;

  if (!type || !details) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const method = await prisma.paymentMethod.create({
    data: {
      userId: session.user.id,
      type,
      provider: provider ?? null,
      details,
    },
  });

  return NextResponse.json(method);
}
