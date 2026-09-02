import { DecisionDetailView } from "@/features/decisions";
import { getDecision } from "@/features/decisions/queries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/decisions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const decision = await getDecision(id);

  if (!decision) {
    return { title: "Decision" };
  }

  return {
    title: decision.question,
    description: decision.context.slice(0, 160),
  };
}

export default async function DecisionPage({
  params,
}: PageProps<"/decisions/[id]">) {
  const { id } = await params;

  return <DecisionDetailView id={id} />;
}
