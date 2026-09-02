import { toast } from "@/shared/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import { updateProfileSchema, type UpdateProfileSchema } from "../schemas";

export const useUpdateProfile = (name: string) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UpdateProfileSchema>({
    defaultValues: { name },
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
  });

  const onSubmit = (data: UpdateProfileSchema) => {
    startTransition(async () => {
      const result = await updateProfile(data);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.error,
        });
        return;
      }

      form.reset({ name: data.name });
      router.refresh();
      toast.add({
        type: "success",
        description: "Name updated",
      });
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
  };
};
