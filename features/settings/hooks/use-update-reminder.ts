import { toast } from "@/shared/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateReminder } from "../actions";
import type { ReminderToggleId } from "../consts";

export const useUpdateReminder = (
  id: ReminderToggleId,
  initialEnabled: boolean,
) => {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onCheckedChange = (next: boolean) => {
    const previous = enabled;
    setEnabled(next);

    startTransition(async () => {
      const result = await updateReminder({ id, enabled: next });

      if (!result.success) {
        setEnabled(previous);
        toast.add({
          type: "error",
          description: result.error,
        });
        return;
      }

      router.refresh();
    });
  };

  return {
    enabled,
    isPending,
    onCheckedChange,
  };
};
