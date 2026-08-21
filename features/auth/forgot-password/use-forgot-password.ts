import { toast } from "@/shared/components/ui/toast";
import { authClient } from "@/shared/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordSchema } from "./schemas";

export const useForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });
      if (error) {
        toast.add({
          type: "error",
          description: error.message || "Failed to send reset password email",
        });
        return;
      }
      toast.add({
        type: "success",
        description: "Reset password email sent",
      });

      router.push(`/verify-email?email=${data.email}`);
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    errors: form.formState.errors,
  };
};
