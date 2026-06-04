"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SiteHeader() {
  const { isMobile } = useSidebar();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2 mr-18">
          <ModeToggle />
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="rounded-lg">$</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-sm font-medium">Real Account</span>
              <div className="flex justify-between">
                <span className="text-primary truncate text-xs">BTC</span>
                <span className="text-muted-foreground truncate text-xs">
                  $0.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
