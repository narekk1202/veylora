import { ReviewView } from "@/features/reviews";

export default async function ReviewPage({
  params,
}: PageProps<"/reviews/[id]">) {
  const { id } = await params;

  return <ReviewView id={id} />;
}
