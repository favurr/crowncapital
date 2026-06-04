import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import NotAdmin from "./components/not-admin";
import { Toaster } from "@/components/ui/sonner";

import { requireAdmin } from "@/lib/auth/admin-guard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check admin session
  const user = await requireAdmin();

  // User is logged in but not an admin
  if (!user) return <NotAdmin />;

  // Admin layout
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Global toasters */}
      <Toaster />
    </div>
  );
}
