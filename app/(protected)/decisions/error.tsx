"use client";

import { Button } from "@/shared/components/ui/button";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-2xl font-serif font-medium">Something went wrong!</p>
      <p className="text-muted-foreground text-sm">Try again in a moment.</p>
      {error.digest ? (
        <p className="text-muted-foreground text-xs">
          Error ID: {error.digest}
        </p>
      ) : null}
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
