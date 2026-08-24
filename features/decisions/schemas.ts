import { CATEGORY_IDS } from "@/shared/constants/catergories.consts";
import { startOfTomorrow } from "date-fns";
import z from "zod";

export const newDecisionSchema = z.object({
  category: z.enum(CATEGORY_IDS),
  question: z.string().min(1, "Question is required"),
  context: z.string().min(1, "Context and background is required"),
  urgency: z.string().min(1, "Urgency is required"),
  options: z
    .array(z.object({ id: z.string().min(1), label: z.string().min(1) }))
    .min(2),
  selectedOptionId: z.string().min(1, "One option must be selected"),
  primaryReasons: z.string().min(1, "Primary reasons are required"),
  potentialConcerns: z.string().min(1, "Potential concerns are required"),
  assumptions: z.string().min(1, "Assumptions are required"),
  predictions: z.string().min(1, "Predictions are required"),
  confidence: z.number().min(0).max(100),
  reviewDate: z.date().refine((date) => date >= startOfTomorrow(), {
    message: "Review date must be tomorrow or later",
  }),
});

export type NewDecisionSchema = z.infer<typeof newDecisionSchema>;
