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
import { User } from "better-auth";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth/auth-client";
import { toast } from "./ui/toast";

type AvatarDropdownProps = {
  user: User;
};

const AvatarDropdown = ({ user }: AvatarDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      toast.promise(authClient.signOut(), {
        loading: "Logging out...",
        success: () => {
          router.refresh();
          return "Logged out successfully";
        },
        error: "Failed to log out",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative size-10 cursor-pointer rounded-full">
        <Avatar>
          <AvatarImage alt={user.name || ""} src={user.image || ""} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="truncate text-sm leading-none font-medium">
                {user.name}
              </p>
              <p className="text-muted-foreground truncate text-xs leading-none">
                {user.email}
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
