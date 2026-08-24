export function formatDecisionDate(date: Date) {
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
    .replace(",", "");
}

export function toDecisionOptionCreates(
  options: { id: string; label: string }[],
  selectedOptionId: string,
) {
  return options.map((option, index) => ({
    label: option.label,
    sortOrder: index + 1,
    isSelected: option.id === selectedOptionId,
  }));
}
