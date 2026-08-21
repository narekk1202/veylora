import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchema } from "./schemas";

export const useResetPassword = () => {
  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
    errors: form.formState.errors,
  };
};
