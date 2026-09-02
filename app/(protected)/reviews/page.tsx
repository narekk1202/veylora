import { ReviewsView } from "@/features/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Decisions ready for honest reflection. Compare what you predicted with what actually happened.",
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <ReviewsView searchParams={await searchParams} />;
}
