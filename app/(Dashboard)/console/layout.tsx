import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { AdminLink } from "@/components/adminlink";
import { LogoIcon } from "@/components/logo";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");
  if (!session.user) redirect("/auth/login");
  if ((session.user as any).role !== "USER") {
    return (
      <main>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full py-4 items-center gap-1 px-4 lg:gap-2 lg:px-16">
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <LogoIcon className="size-10 md:size-7" />
              <span className={"hidden md:block text-2xl font-bold"}>
                AlphaWealth
              </span>
            </Link>
          </div>
        </header>
        <AdminLink />
        <Toaster />
      </main>
    );
  }

  return (
    <>
      <head>
        <script
          type="module"
          src="https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js"
        ></script>
      </head>
      <body>
        <main>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              {children}

              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </main>
      </body>
    </>
  );
}
