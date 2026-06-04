import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    // Use BetterAuth to resend the verification email
    await auth.api.sendVerificationEmail({
      body: { email },
      headers: await headers(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Failed to resend verification email",
      },
      { status: 500 },
    );
  }
}
