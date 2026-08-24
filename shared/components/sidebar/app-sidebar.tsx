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
import {
  CATEGORY_COLOR,
  CATEGORY_NAME,
} from "@/shared/constants/catergories.consts";
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
      url: "/reviews",
    },
    {
      title: "Insights",
      url: "/insights",
    },
  ],
};

const navCategories: { navCategories: NavItem[] } = {
  navCategories: [
    {
      title: CATEGORY_NAME.CAREER,
      url: "/decisions?category=career",
      dotColor: CATEGORY_COLOR.CAREER,
    },
    {
      title: CATEGORY_NAME.PERSONAL,
      url: "/decisions?category=personal",
      dotColor: CATEGORY_COLOR.PERSONAL,
    },
    {
      title: CATEGORY_NAME.FINANCE,
      url: "/decisions?category=finance",
      dotColor: CATEGORY_COLOR.FINANCE,
    },
    {
      title: CATEGORY_NAME.RELATIONSHIPS,
      url: "/decisions?category=relationships",
      dotColor: CATEGORY_COLOR.RELATIONSHIPS,
    },
  ],
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
