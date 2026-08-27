"use client";

import { Field, FieldError } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { useCompleteReview } from "../../hooks/use-complete-review";
import AccuracyPicker from "./accuracy-picker";
import ReviewFormSection from "./review-form-section";

const DueReviewForm = ({
  children,
  reviewId,
}: {
  children?: (isPending: boolean) => ReactNode;
  reviewId: string;
}) => {
  const { form, isPending, onSubmit } = useCompleteReview(reviewId);
  const errors = form.formState.errors;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      <ReviewFormSection step={1} title="What actually happened?">
        <Field data-invalid={!!errors.outcome}>
          <Textarea
            {...form.register("outcome")}
            aria-invalid={!!errors.outcome}
            placeholder="Describe the outcome as objectively as possible..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What actually happened?"
          />
          {errors.outcome && <FieldError>{errors.outcome.message}</FieldError>}
        </Field>
      </ReviewFormSection>

      <ReviewFormSection step={2} title="How accurate was your prediction?">
        <Field data-invalid={!!errors.accuracy}>
          <Controller
            control={form.control}
            name="accuracy"
            render={({ field }) => (
              <AccuracyPicker
                value={field.value}
                onChange={field.onChange as (value: PredictionAccuracy) => void}
              />
            )}
          />
          {errors.accuracy && (
            <FieldError>{errors.accuracy.message}</FieldError>
          )}
        </Field>
      </ReviewFormSection>

      <ReviewFormSection step={3} title="What surprised you?">
        <Field data-invalid={!!errors.surprises}>
          <Textarea
            {...form.register("surprises")}
            aria-invalid={!!errors.surprises}
            placeholder="Details you didn't anticipate, both positive and negative..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What surprised you?"
          />
          {errors.surprises && (
            <FieldError>{errors.surprises.message}</FieldError>
          )}
        </Field>
      </ReviewFormSection>

      <ReviewFormSection step={4} title="What did you learn?">
        <Field data-invalid={!!errors.lessons}>
          <Textarea
            {...form.register("lessons")}
            aria-invalid={!!errors.lessons}
            placeholder="Knowledge gained about the world, others, or yourself..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What did you learn?"
          />
          {errors.lessons && <FieldError>{errors.lessons.message}</FieldError>}
        </Field>
      </ReviewFormSection>

      <ReviewFormSection step={5} title="What would you do differently?">
        <Field data-invalid={!!errors.wouldDoDifferently}>
          <Textarea
            {...form.register("wouldDoDifferently")}
            aria-invalid={!!errors.wouldDoDifferently}
            placeholder="If you were in the same situation again, how would your process change?"
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What would you do differently?"
          />
          {errors.wouldDoDifferently && (
            <FieldError>{errors.wouldDoDifferently.message}</FieldError>
          )}
        </Field>
      </ReviewFormSection>

      {children?.(isPending)}
    </form>
  );
};

export default DueReviewForm;
