import { InsightsView } from "@/features/insights";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Veylora",
  description:
    "Patterns in how you make decisions. Discover where your intuition thrives and where your reasoning needs space to grow.",
};

export default function InsightsPage() {
  return <InsightsView />;
}
