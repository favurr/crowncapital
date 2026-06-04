import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { currentPassword, newPassword, revokeOtherSessions } =
      await req.json();

    const data = await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: revokeOtherSessions || false,
      },
      headers: await headers(), // required to pass cookies/session
    });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to update password" },
      { status: 400 },
    );
  }
}
