import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <Toaster
        toastOptions={{
          className: "mb-13",
        }}
      />
    </main>
  );
}
