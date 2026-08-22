"use client";

import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  loadingText?: string;
}

const SubmitButton = ({
  loadingText,
  children,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending && loadingText ? loadingText : children}
    </Button>
  );
};

export default SubmitButton;
