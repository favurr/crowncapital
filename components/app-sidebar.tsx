"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/logo";
import Link from "next/link";
import NavUser from "@/components/nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      items: [
        {
          title: "Dashboard",
          url: "console/dashboard",
        },
        {
          title: "Market",
          url: "console/market",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          title: "Deposit",
          url: "console/deposit",
        },
        {
          title: "Transfer",
          url: "console/transfer",
        },
        {
          title: "Withdrawal",
          url: "console/withdraw",
        },
        {
          title: "History",
          url: "console/history",
        },
      ],
    },
    {
      title: "Apps",
      items: [
        {
          title: "Packages",
          url: "console/packages",
        },
        {
          title: "Signal",
          url: "console/signal",
        },
        {
          title: "AML/KYC",
          url: "console/aml",
        },
      ],
    },
    {
      title: "Extras",
      items: [
        {
          title: "Settings",
          url: "console/settings",
        },
        {
          title: "Help",
          url: "console/help",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link
            href="/"
            aria-label="home"
            className="flex items-center space-x-2"
          >
            <LogoIcon className="size-10 md:size-7" />
            <span className={"hidden md:block text-xl font-semibold"}>
              AlphaWealth
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={`${item.title}-${pathname}`}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.includes(item.url)}
                    >
                      <Link href={`/${item.url}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
