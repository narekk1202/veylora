import { toast } from "@/shared/components/ui/toast";
import { useTransition } from "react";

function filenameFromDisposition(disposition: string | null, fallback: string) {
  const match = disposition?.match(/filename="([^"]+)"/);
  return match?.[1] ?? fallback;
}

export const useExport = () => {
  const [isPending, startTransition] = useTransition();

  const onExport = (href: string, fallbackFilename: string) => {
    startTransition(async () => {
      try {
        const response = await fetch(href);

        if (!response.ok) {
          toast.add({
            type: "error",
            description: "Failed to export data",
          });
          return;
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = filenameFromDisposition(
          response.headers.get("Content-Disposition"),
          fallbackFilename,
        );
        link.click();
        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error(error);
        toast.add({
          type: "error",
          description: "Failed to export data",
        });
      }
    });
  };

  return {
    isPending,
    onExport,
  };
};
