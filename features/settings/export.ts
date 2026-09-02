import { NextResponse } from "next/server";
import { getExportDecisions } from "./queries";
import { toDecisionsCsv, toJournalMarkdown } from "./utils";

function attachment(body: string, filename: string, contentType: string) {
  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export async function exportDecisionsExcel() {
  const decisions = await getExportDecisions();

  if (!decisions) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return attachment(
    toDecisionsCsv(decisions),
    "veylora-decisions.csv",
    "text/csv; charset=utf-8",
  );
}

export async function exportJournalMarkdown() {
  const decisions = await getExportDecisions();

  if (!decisions) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return attachment(
    toJournalMarkdown(decisions),
    "veylora-journal.md",
    "text/markdown; charset=utf-8",
  );
}
