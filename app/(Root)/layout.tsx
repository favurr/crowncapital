"use client";

import { usePathname } from "next/navigation";
import { HeroHeader } from "@/components/header";
import { Footer, SmallFooter } from "@/components/footer";
import AutoToast from "@/components/AutoToast";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  const isBlog = pathname.startsWith("/blog");
  
  return (
    <main>
      <HeroHeader />
      {children}
      {isBlog ? <SmallFooter /> : <Footer />}
      <AutoToast />
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          className: "mb-20",
        }}
      />
    </main>
  );
}
