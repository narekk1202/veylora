import { NewDecisionView } from "@/features/decisions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Decision",
  description:
    "Capture the question, options, reasoning, and what you expect to happen before you lock the record.",
};

export default function NewDecisionPage() {
  return <NewDecisionView />;
}
