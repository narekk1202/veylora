import { toast } from "@/shared/components/ui/toast";
import { authClient } from "@/shared/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./schemas";

export const useLogin = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        ...data,
        callbackURL: "/overview",
      });

      if (error) {
        toast.add({
          type: "error",
          description: error.message || "Failed to sign in",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Signed in successfully",
      });

      router.push("/");
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    errors: form.formState.errors,
  };
};
