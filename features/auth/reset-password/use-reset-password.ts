import { toast } from "@/shared/components/ui/toast";
import { authClient } from "@/shared/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchema } from "./schemas";

export const useResetPassword = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: searchParams.get("token") ?? "",
      });

      if (error) {
        toast.add({
          type: "error",
          description: error.message || "Failed to reset password",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Password reset successfully",
      });
      router.push("/login");
    });
  };
  return {
    form,
    onSubmit,
    errors: form.formState.errors,
    isPending,
  };
};
