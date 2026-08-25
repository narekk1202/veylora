import { DecisionsView } from "@/features/decisions";

export default async function DecisionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <DecisionsView searchParams={await searchParams} />;
}
