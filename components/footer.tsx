import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const company = [
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "FAQs",
      href: "/faq",
    },
    {
      title: "Contact Support",
      href: "/support",
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/terms",
    },
  ];

  const resources = [
    {
      title: "Wallet",
      href: "/wallet",
    },
    {
      title: "Swap",
      href: "/swap",
    },
    {
      title: "Buy Crypto",
      href: "/buy",
    },
    {
      title: "Security",
      href: "/security",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ];

  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-5xl lg:border-x",
          "bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <a className="w-max flex items-center space-x-2" href="/">
              <LogoIcon className="h-5" />
              <span>AlphaWealth</span>
            </a>
            <p className="max-w-sm text-sm text-muted-foreground">
              Intelligent financial insights and seamless portfolio
              optimization.
            </p>
            <div>
              <span className="max-w-sm text-sm font-semibold text-muted-foreground">
                Disclamer:
              </span>
              <p className="max-w-sm text-sm text-muted-foreground">
                Investing involves risk, including the possible loss of
                principal. AlphaWealth does not guarantee any specific outcome
                or profit.
              </p>
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AlphaWealth, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SmallFooter() {
  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-5xl lg:border-x",
          "bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.05),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <a className="flex items-center space-x-2" href="/">
            <LogoIcon className="h-5" />
            <span>AlphaWealth</span>
          </a>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} AlphaWealth
          </p>
        </div>
      </div>
    </footer>
  );
}