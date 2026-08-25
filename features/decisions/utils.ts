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

export function toLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.replace(/^[•*-]\s*/, "").trim())
    .filter(Boolean);
}
