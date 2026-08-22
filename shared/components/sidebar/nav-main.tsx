"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonVariants,
} from "@/shared/components/ui/sidebar";
import { cn } from "../../lib/utils";

export type NavItem = {
  title: string;
  url: Route<string>;
  dotColor?: string;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-2">
      {items.map((item) => {
        const isActive =
          pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <SidebarMenuItem key={item.title}>
            <Link
              href={item.url}
              className={cn(
                sidebarMenuButtonVariants(),
                "h-10 w-full font-medium",
                isActive && "active_sidebar_link",
              )}
            >
              <span className="flex items-center gap-2">
                {item.dotColor && (
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: item.dotColor }}
                  />
                )}
                {item.title}
              </span>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
