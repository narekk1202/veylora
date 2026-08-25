import AppHeader from "@/shared/components/app-header";
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { auth } from "@/shared/lib/auth";
import { User } from "better-auth";
import { headers } from "next/headers";

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
