import { OverviewView } from "@/features/overview";
import { auth } from "@/shared/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Overview",
  description: "Capture, lock, and review decisions with an honest past self.",
};

export default async function OverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return <OverviewView firstName={firstName} />;
}
