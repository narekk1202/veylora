import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { NavItem, NavMain } from "./nav-main";
import { Separator } from "./ui/separator";

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
      title: "Career",
      url: "/category/career",
      dotColor: "#60A5FA",
    },
    {
      title: "Personal",
      url: "/category/personal",
      dotColor: "#34D399",
    },
    {
      title: "Finance",
      url: "/category/finance",
      dotColor: "#FBBF24",
    },
    {
      title: "Relationships",
      url: "/category/relationships",
      dotColor: "#FB7185",
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
      <SidebarFooter>
        <Separator />
        <NavMain items={[{ title: "Settings", url: "/settings" }]} />
      </SidebarFooter>
    </Sidebar>
  );
}
