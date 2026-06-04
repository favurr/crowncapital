// app/api/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Pass headers so BetterAuth can identify the current user
    const headers = req.headers;

    // Get all sessions
    const sessionData = await auth.api.listSessions({ headers });

    // Get current session token from the request cookie
    const currentToken = req.cookies.get("better-auth-token")?.value;

    // Map sessions to user-friendly structure
    const mapped = sessionData.map((s: any) => ({
      id: s.id,
      device: s.userAgent || "Unknown device",
      location: s.ipAddress || "Unknown location",
      lastActive: new Date(s.updatedAt).toLocaleString(),
      isCurrent: s.token === currentToken,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const headers = req.headers;
    await auth.api.revokeOtherSessions({ headers });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to revoke other sessions:", err);
    return NextResponse.json(
      { error: "Failed to revoke other sessions" },
      { status: 500 },
    );
  }
}
