import { DecisionDetailView } from "@/features/decisions";

export default async function DecisionPage({
  params,
}: PageProps<"/decisions/[id]">) {
  const { id } = await params;

  return <DecisionDetailView id={id} />;
}
