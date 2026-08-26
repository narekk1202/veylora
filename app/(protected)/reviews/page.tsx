import { ReviewsView } from "@/features/reviews";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <ReviewsView searchParams={await searchParams} />;
}
