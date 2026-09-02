import { ReviewView } from "@/features/reviews";
import { getReview } from "@/features/reviews/queries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/reviews/[id]">): Promise<Metadata> {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) {
    return { title: "Review" };
  }

  return {
    title: review.decision.question,
    description:
      "Review this decision against what actually happened, and keep the lessons.",
  };
}

export default async function ReviewPage({
  params,
}: PageProps<"/reviews/[id]">) {
  const { id } = await params;

  return <ReviewView id={id} />;
}
