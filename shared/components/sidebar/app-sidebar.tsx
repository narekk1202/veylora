import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { CATEGORIES } from "@/shared/constants/catergories.consts";
import { Separator } from "../ui/separator";
import { NavItem, NavMain } from "./nav-main";

const navLinks: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Overview",
      url: "/overview",
    },
    {
      title: "Decisions",
      url: "/decisions",
    },
    {
      title: "Reviews",
      url: "#",
    },
    {
      title: "Insights",
      url: "#",
    },
  ],
};

const navCategories: { navCategories: NavItem[] } = {
  navCategories: CATEGORIES.map((category) => ({
    title: category.name,
    url: `/decisions?category=${category.id}`,
    dotColor: category.color,
  })),
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <span className="font-serif text-lg font-bold">V</span>
              </div>
              <span className="font-serif text-lg italic">Veylora</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <NavMain items={navLinks.navMain} />
            <Separator />
            <span className="text-muted-foreground text-sm font-medium">
              Categories
            </span>
            <NavMain items={navCategories.navCategories} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
