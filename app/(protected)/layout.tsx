import { AppSidebar } from "@/shared/components/app-sidebar";
import { Separator } from "@/shared/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: LayoutProps<"/">;
}) {
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
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
      </SidebarInset>
      <>{children}</>
    </SidebarProvider>
  );
}
