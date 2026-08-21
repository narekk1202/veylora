import { OnboardingView } from "@/features/onboarding";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const onboardingDone = session?.user?.onboardingCompleted;

  if (onboardingDone) redirect("/overview");

  return <OnboardingView />;
}
