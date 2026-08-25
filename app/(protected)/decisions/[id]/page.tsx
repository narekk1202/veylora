import DecisionDetailView from "@/features/decisions/ui/decision-detail/decision-detail-view";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function DecisionPage({
  params,
}: PageProps<"/decisions/[id]">) {
  const { id } = await params;
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const decision = await prisma.decision.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      options: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!decision) notFound();

  return <DecisionDetailView decision={decision} />;
}
