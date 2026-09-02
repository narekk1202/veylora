import { toast } from "@/shared/components/ui/toast";
import { useTransition } from "react";
import { deleteAccount } from "../actions";

export const useDeleteAccount = () => {
  const [isPending, startTransition] = useTransition();

  const onConfirm = () => {
    startTransition(async () => {
      const result = await deleteAccount();

      if (result?.success === false) {
        toast.add({
          type: "error",
          description: result.error,
        });
      }
    });
  };

  return {
    isPending,
    onConfirm,
  };
};
