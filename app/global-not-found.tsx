import "./globals.css";
import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found";
import { HeroHeader } from "@/components/header";
import { Footer } from "@/components/footer";
import localFont from "next/font/local";

const wixMadeforDisplay = localFont({
  src: [
    {
      path: "../public/fonts/WixMadeforDisplay-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/WixMadeforDisplay-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/WixMadeforDisplay-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/WixMadeforDisplay-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/WixMadeforDisplay-ExtraBold.ttf",
      weight: "800",
    },
  ],
  variable: "--font-wix-madefor-display",
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${wixMadeforDisplay.variable}`}>
      <body>
        <HeroHeader />
        <NotFoundPage />
        <Footer />
      </body>
    </html>
  );
}
