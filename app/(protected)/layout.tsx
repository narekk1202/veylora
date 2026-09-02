import AppHeader from "@/shared/components/app-header";
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { NOINDEX_ROBOTS } from "@/shared/constants/seo.consts";
import { auth } from "@/shared/lib/auth";
import { User } from "better-auth";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  robots: NOINDEX_ROBOTS,
};

export default async function ProtectedLayout({ children }: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <AppHeader user={session?.user ?? ({} as User)} />
        <main className="min-h-svh flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
