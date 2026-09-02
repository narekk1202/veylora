import { Decision, Review } from "@/shared/generated/prisma/client";
import { Category } from "@/shared/generated/prisma/enums";

export type DecisionWithReview = Decision & {
  review: Review;
};

export type TrendPoint = {
  month: string;
  confidence: number;
};

export type TrendObservation = {
  points: TrendPoint[];
  lead: string;
  highlight: string;
  follow: string;
};

export type CalibrationPoint = {
  confidence: number;
  actual: number | null;
  ideal: number;
};

export type CalibrationInsight = {
  points: CalibrationPoint[];
  patternTitle: string;
  patternDescription: string;
};

export type CategoryInsight = {
  category: Category;
  title: string;
  description: string;
};

export type TimelineStatus = "late" | "on_time" | "early";

export type TimelineEstimateInsight = {
  title: string;
  status: TimelineStatus;
  statusLabel: string;
  expectedDays: number;
  actualDays: number;
  progress: number;
};

export type TimelineCalibration = {
  estimates: TimelineEstimateInsight[];
  biasTitle: string;
  lead: string;
  highlight: string;
  follow: string;
};

export type InsightsData = {
  predictionAccuracy: number;
  confidenceScore: number;
  trend: TrendObservation;
  calibration: CalibrationInsight;
  categories: CategoryInsight[];
  timeline: TimelineCalibration;
};
