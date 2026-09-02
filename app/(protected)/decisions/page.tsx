import { DecisionsView } from "@/features/decisions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decisions",
  description:
    "Your full decision archive — locked, in progress, and reviewed.",
};

export default async function DecisionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <DecisionsView searchParams={await searchParams} />;
}
