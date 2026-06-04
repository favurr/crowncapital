import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import CopyUserId from "./copy-user-id";
import Image from "next/image";

/* ---------------- utils ---------------- */
function formatDate(date?: Date | string | null) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString();
}

function shortUserId(id: string) {
  return id.slice(-8);
}

/* ---------------- page ---------------- */
export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { user } = session;

  return (
    <div className="w-[80%] mx-auto py-6 space-y-12">
      {/* ================= HEADER ================= */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Avatar"}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              (user.name ?? user.email)?.[0]?.toUpperCase()
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">
              {user.name ?? "Unnamed user"}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-muted">
            Role: {user.role ?? "user"}
          </span>

          <span
            className={`px-3 py-1 rounded-full ${
              user.emailVerified
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.emailVerified ? "Verified" : "Unverified"}
          </span>
        </div>
      </section>

      {/* ================= ID + PROVIDERS ================= */}
      <section className="border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Identity</h2>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground">User ID</p>
            <div className="flex items-center gap-2">
              <code className="px-2 py-1 rounded bg-muted text-sm">
                {shortUserId(user.id)}
              </code>
              <CopyUserId value={shortUserId(user.id)} />
            </div>
          </div>

          <div>
            <p className="text-muted-foreground">Auth providers</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-1 rounded bg-muted text-xs">
                Email Created
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCOUNT TIMELINE ================= */}
      <section className="border rounded-xl p-6">
        <h2 className="font-medium mb-4">Account timeline</h2>

        <div className="flex items-center justify-between gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Account created</p>
            <p>{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </section>

      {/* ================= NAV ================= */}
      <section className="border-t pt-6 flex flex-wrap gap-4 text-sm">
        <a href="/console/settings?tab=account" className="underline">
          Account Settings
        </a>
        <a href="/console/settings?tab=security" className="underline">
          Security Settings
        </a>
        <a href="/console/settings?tab=kyc" className="underline">
          KYC Settings
        </a>
        <a href="/console/settings?tab=plan" className="underline">
          Billing & Plan
        </a>

        {user.role === "ADMIN" && (
          <a href="/admin" className="underline">
            Admin view
          </a>
        )}
      </section>
    </div>
  );
}
