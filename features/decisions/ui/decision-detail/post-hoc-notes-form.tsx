"use client";

import { savePostHocNotes } from "@/features/decisions/actions";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { SavePostHocNotesState } from "../../types";

const initialState: SavePostHocNotesState = { status: "idle" };

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : null}
      {pending ? "Saving…" : "Save note"}
    </Button>
  );
}

export default function PostHocNotesForm({
  decisionId,
  initialNotes,
}: {
  decisionId: string;
  initialNotes: string;
}) {
  const [state, formAction] = useActionState(savePostHocNotes, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="decisionId" value={decisionId} />
      <Textarea
        aria-label="Post-hoc notes"
        className="min-h-28 resize-y"
        defaultValue={initialNotes}
        maxLength={5_000}
        name="postHocNotes"
        placeholder="Add notes or observations that have occurred since locking..."
      />
      <div className="flex items-center justify-between gap-3">
        <p
          aria-live="polite"
          className={
            state.status === "error"
              ? "text-destructive text-xs"
              : "text-muted-foreground text-xs"
          }
        >
          {state.status === "success"
            ? "Notes saved."
            : state.status === "error"
              ? state.message
              : null}
        </p>
        <SaveButton />
      </div>
    </form>
  );
}
