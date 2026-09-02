import { formatAccuracyLabel, formatLongDate } from "@/features/reviews/utils";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import type { Prisma } from "@/shared/generated/prisma/client";
import { format } from "date-fns";

export type ExportDecision = Prisma.DecisionGetPayload<{
  include: {
    options: true;
    review: true;
  };
}>;

function csvCell(value: string | number | null | undefined) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function csvRow(values: Array<string | number | null | undefined>) {
  return values.map(csvCell).join(",");
}

function selectedOptionLabel(decision: ExportDecision) {
  return decision.options.find((option) => option.isSelected)?.label ?? "";
}

function optionsList(decision: ExportDecision) {
  return decision.options.map((option) => option.label).join("; ");
}

export function toDecisionsCsv(decisions: ExportDecision[]) {
  const header = csvRow([
    "Question",
    "Category",
    "Status",
    "Created",
    "Review date",
    "Confidence",
    "Selected option",
    "Options",
    "Context",
    "Urgency",
    "Primary reasons",
    "Potential concerns",
    "Assumptions",
    "Predictions",
    "Post-hoc notes",
    "Review status",
    "Outcome",
    "Accuracy",
    "Surprises",
    "Lessons",
    "Would do differently",
    "Reviewed at",
  ]);

  const rows = decisions.map((decision) =>
    csvRow([
      decision.question,
      CATEGORY_CONFIG[decision.category].name,
      decision.status,
      format(decision.createdAt, "yyyy-MM-dd"),
      format(decision.reviewDate, "yyyy-MM-dd"),
      decision.confidence,
      selectedOptionLabel(decision),
      optionsList(decision),
      decision.context,
      decision.urgency,
      decision.primaryReasons,
      decision.potentialConcerns,
      decision.assumptions,
      decision.predictions,
      decision.postHocNotes,
      decision.review?.status ?? "",
      decision.review?.outcomeSummary ?? "",
      decision.review?.accuracy
        ? formatAccuracyLabel(decision.review.accuracy)
        : "",
      decision.review?.surprises ?? "",
      decision.review?.lessonsLearned ?? "",
      decision.review?.wouldDoDifferently ?? "",
      decision.reviewedAt ? format(decision.reviewedAt, "yyyy-MM-dd") : "",
    ]),
  );

  return `\uFEFF${[header, ...rows].join("\r\n")}\r\n`;
}

function markdownBlock(title: string, body: string | null | undefined) {
  const text = body?.trim();
  if (!text) return "";
  return `### ${title}\n\n${text}\n\n`;
}

export function toJournalMarkdown(decisions: ExportDecision[]) {
  const exportedAt = formatLongDate(new Date());
  const entries = decisions.map((decision) => {
    const options = decision.options
      .map(
        (option) =>
          `- ${option.label}${option.isSelected ? " (selected)" : ""}`,
      )
      .join("\n");

    const review = decision.review
      ? [
          markdownBlock("Outcome", decision.review.outcomeSummary),
          decision.review.accuracy
            ? `### Accuracy\n\n${formatAccuracyLabel(decision.review.accuracy)}\n\n`
            : "",
          markdownBlock("Surprises", decision.review.surprises),
          markdownBlock("Lessons", decision.review.lessonsLearned),
          markdownBlock(
            "Would do differently",
            decision.review.wouldDoDifferently,
          ),
        ].join("")
      : "";

    return `## ${decision.question.trim() || "Untitled decision"}

- Category: ${CATEGORY_CONFIG[decision.category].name}
- Status: ${decision.status}
- Created: ${formatLongDate(decision.createdAt)}
- Review date: ${formatLongDate(decision.reviewDate)}
- Confidence: ${decision.confidence}%

${markdownBlock("Context", decision.context)}${markdownBlock("Urgency", decision.urgency)}### Options

${options || "- None"}

${markdownBlock("Primary reasons", decision.primaryReasons)}${markdownBlock("Potential concerns", decision.potentialConcerns)}${markdownBlock("Assumptions", decision.assumptions)}${markdownBlock("Predictions", decision.predictions)}${markdownBlock("Post-hoc notes", decision.postHocNotes)}${review}`.trim();
  });

  return `# Veylora journal

Exported ${exportedAt}.

${entries.join("\n\n---\n\n") || "No decisions yet."}
`;
}
