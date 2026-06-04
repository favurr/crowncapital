import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL),
    );
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: loggedInUser.id },
    data: { emailVerified: true },
  });

  return NextResponse.redirect(
    new URL(
      "/console/dashboard?verified=true",
      process.env.NEXT_PUBLIC_BASE_URL,
    ),
  );
}
