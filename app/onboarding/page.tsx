import { OnboardingView } from "@/features/onboarding";
import { NOINDEX_ROBOTS } from "@/shared/constants/seo.consts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "A decision journal that locks your reasoning before outcomes — so hindsight stays honest.",
  robots: NOINDEX_ROBOTS,
};

export default async function OnboardingPage() {
  return <OnboardingView />;
}
