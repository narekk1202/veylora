import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { completeReviewSchema, CompleteReviewSchema } from "../schemas";

export const useCompleteReview = () => {
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
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
};
