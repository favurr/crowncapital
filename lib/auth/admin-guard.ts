// lib/auth/admin-guard.ts
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Not logged in → redirect to login
  if (!session?.user) redirect("/auth/login");

  const user = session.user;

  // Role check
  if (user.role !== "ADMIN") return null;

  return user;
}
