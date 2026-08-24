import { CATEGORY_NAME } from "@/shared/constants/catergories.consts";

export type DecisionCategory = keyof typeof CATEGORY_NAME;
export type DecisionStatus = "locked" | "reviewed";

export type Decision = {
  title: string;
  category: DecisionCategory;
  status: DecisionStatus;
  date: Date;
  confidence?: number;
  accuracyLabel?: string;
  reviewInDays?: number;
};
