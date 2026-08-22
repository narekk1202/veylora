import AppHeader from "@/shared/components/app-header";
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const onboardingDone = session?.user?.onboardingCompleted;

  if (!onboardingDone) redirect("/onboarding");

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
        <AppHeader />
        <main className="min-h-svh flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
