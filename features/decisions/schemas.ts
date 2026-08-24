import { CATEGORY_NAME } from "@/shared/constants/catergories.consts";
import { startOfTomorrow } from "date-fns";
import z from "zod";

export const newDecisionSchema = z.object({
  category: z.enum(CATEGORY_NAME),
  question: z.string().min(1),
  context: z.string().min(1),
  urgency: z.string().min(1),
  options: z
    .array(z.object({ id: z.string().min(1), label: z.string().min(1) }))
    .min(2),
  selectedOptionId: z.uuid(),
  primaryReasons: z.string().min(1),
  potentialConcerns: z.string().min(1),
  assumptions: z.string().min(1),
  predictions: z.string().min(1),
  confidence: z.number().min(0).max(100),
  reviewDate: z.date().refine((date) => date >= startOfTomorrow(), {
    message: "Review date must be tomorrow or later",
  }),
});

export type NewDecisionSchema = z.infer<typeof newDecisionSchema>;
