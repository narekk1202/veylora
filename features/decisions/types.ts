import { CategoryKey } from "@/shared/constants/catergories.consts";

export type DecisionCategory = CategoryKey;
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
