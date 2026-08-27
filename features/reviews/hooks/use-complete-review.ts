import { toast } from "@/shared/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { completeReview } from "../actions";
import { completeReviewSchema, CompleteReviewSchema } from "../schemas";

export const useCompleteReview = (reviewId: string) => {
  const [isPending, startTansition] = useTransition();
  const router = useRouter();

  const form = useForm<CompleteReviewSchema>({
    resolver: zodResolver(completeReviewSchema),
    defaultValues: {
      outcome: "",
      accuracy: undefined,
      surprises: "",
      lessons: "",
      wouldDoDifferently: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: CompleteReviewSchema) => {
    startTansition(async () => {
      const result = await completeReview(reviewId, data);

      if (!result?.success) {
        toast.add({
          type: "error",
          description: "Failed to complete review",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Review completed successfully",
      });
    });
  };

  return {
    form,
    isPending,
    onSubmit,
  };
};
