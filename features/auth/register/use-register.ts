import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./schemas";

export const useRegister = () => {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
		errors: form.formState.errors,
  };
};
