"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const PreviousPageButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="pl-0"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="size-4" />
      Previous page
    </Button>
  );
};

export default PreviousPageButton;
