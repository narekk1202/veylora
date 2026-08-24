export function formatDecisionDate(date: Date) {
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
    .replace(",", "");
}
