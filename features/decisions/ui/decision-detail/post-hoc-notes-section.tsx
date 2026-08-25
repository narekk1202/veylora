import { LockKeyhole } from "lucide-react";
import PostHocNotesForm from "./post-hoc-notes-form";
import SectionLabel from "./section-label";

export default function PostHocNotesSection({
  decisionId,
  initialNotes,
}: {
  decisionId: string;
  initialNotes: string;
}) {
  return (
    <section className="border-t pt-8">
      <div className="mb-4 flex items-center gap-2">
        <LockKeyhole className="size-4" />
        <SectionLabel>Post-hoc notes</SectionLabel>
      </div>
      <PostHocNotesForm decisionId={decisionId} initialNotes={initialNotes} />
    </section>
  );
}
