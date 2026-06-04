import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

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
  title: "AlphaWealth - Crypto Trading Platform & Broker",
  description:
    "AlphaWealth - Advanced crypto trading platform, broker services, and investment management. Trade Bitcoin, Ethereum, and 1000+ cryptocurrencies with professional tools.",
  keywords:
    "crypto trading, cryptocurrency broker, Bitcoin, Ethereum, trading platform, digital assets",
  authors: [{ name: "AlphaWealth" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "AlphaWealth - Crypto Trading Platform & Broker",
    description:
      "Trade cryptocurrencies on a professional platform with advanced tools and secure broker services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${wixMadeforDisplay.variable} antialiased`}>
        <Script
          id="zsiq-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {}; $zoho.salesiq=$zoho.salesiq||{ready:function(){}};`,
          }}
        />
        <Script
          id="zsiq-script"
          src="https://salesiq.zohopublic.com/widget?wc=siqb0df2d7c54209f2d70429f1c3070fff060da229e578df3c6208b9bf9d8aabfd9"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
