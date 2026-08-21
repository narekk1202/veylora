import { toast } from "@/shared/components/ui/toast";
import { authClient } from "@/shared/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./schemas";

export const useRegister = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    startTransition(async () => {
      const { error } = await authClient.signUp.email(data);

      if (error) {
        toast.add({
          type: "error",
          description: error.message || "Failed to create account",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Account created successfully",
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
