import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return NextResponse.json({ user: session?.user ?? null });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { user: null, message: err?.message },
      { status: 500 },
    );
  }
}
