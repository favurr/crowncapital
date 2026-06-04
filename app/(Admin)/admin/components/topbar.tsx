"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import { toast } from "sonner";
import { signOutUser } from "@/server/users";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
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

  return (
    <header className="flex h-14 items-center justify-end border-b px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleClick}>
            <IconLogout />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
