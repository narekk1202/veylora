import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordSchema } from "./schemas";

export const useForgotPassword = () => {
  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
    errors: form.formState.errors,
  };
};
