"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getSession, signOutUser } from "@/server/users";
import Link from "next/link";
import { Settings2 } from "lucide-react";

export default function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      setLoading(true);
      try {
        const data = await getSession();
        setSession(data);
      } catch {
        toast.error("Failed to load user session");
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  async function handleClick() {
    try {
      const response = await signOutUser();
      if (response?.success) {
        toast.success(response.message + ", Redirecting to login...");
        router.push("/auth/login");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  }

  // Generate initials safely
  const initials = (() => {
    const name = session?.user?.name;
    if (!name) return "CN";

    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

    return (words[0][0] + words[1][0]).toUpperCase();
  })();

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled>
            <Avatar>
              <AvatarFallback>??</AvatarFallback>
            </Avatar>
            Loading...
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!session) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            Unknown User
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg object-cover">
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.user.name}
                </span>
                <span
                  className={`truncate text-xs ${
                    session.user.emailVerified
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {session.user.emailVerified
                    ? "Verified Account"
                    : "Unverified Account"}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg object-cover">
                  {session.user.image ? (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/console/dashboard"
                  className="flex items-center gap-2"
                >
                  <IconCreditCard />
                  Wallet
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between">
                <Link
                  href="/console/profile"
                  className="flex items-center gap-2"
                >
                  <IconUserCircle />
                  View Profile
                </Link>
                {!session.user.emailVerified && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white font-semibold">
                    Unverified
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/console/settings"
                  className="flex items-center gap-2"
                >
                  <Settings2 />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
