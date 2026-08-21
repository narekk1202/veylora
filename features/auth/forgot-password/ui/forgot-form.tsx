"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useForgotPassword } from "../use-forgot-password";

const ForgotForm = () => {
  const { form, errors, onSubmit } = useForgotPassword();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="sm:bg-primary-foreground mt-10 h-44 w-full max-w-md rounded-lg px-6 py-4 sm:border"
    >
      <FieldSet>
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className="text-muted-foreground">
              Email
            </FieldLabel>
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="example@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          <Button className={"h-12 w-full"} type="submit">
            Send reset link
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ForgotForm;
