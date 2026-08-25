"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth/auth-client";
import { toast } from "./ui/toast";

const AvatarDropdown = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Failed to log out",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative size-10 cursor-pointer rounded-full">
        <Avatar>
          <AvatarImage
            alt={session?.user?.name || ""}
            src={session?.user?.image || ""}
          />
          <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="truncate text-sm leading-none font-medium">
                {session?.user?.name}
              </p>
              <p className="text-muted-foreground truncate text-xs leading-none">
                {session?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="#" />}
            className="flex w-full items-center gap-2"
          >
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
