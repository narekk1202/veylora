"use client";

import ConfirmDialog from "@/shared/components/confirm-dialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/toast";
import { useTransition } from "react";
import { deleteDecision } from "../../actions";

const DeleteDialog = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteDecision(id);
      if (result.status === "error") {
        toast.add({ type: "error", description: result.message });
        return;
      }
    });
  };

  return (
    <ConfirmDialog
      title="Delete decision"
      description="Are you sure you want to delete this decision? This action cannot be undone. All associated data will be permanently removed."
      onConfirm={handleConfirm}
      isPending={isPending}
    >
      <Button variant="destructive">Delete decision</Button>
    </ConfirmDialog>
  );
};

export default DeleteDialog;
