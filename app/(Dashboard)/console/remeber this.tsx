import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) redirect("/auth/login");
if (!session.user) redirect("/auth/login");

("Password");
("PortalAccess777!");
