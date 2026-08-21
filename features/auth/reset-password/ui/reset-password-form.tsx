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
import { useResetPassword } from "../use-reset-password";

const ResetPasswordForm = () => {
  const { form, errors, onSubmit } = useResetPassword();
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="sm:bg-primary-foreground mt-10 h-68 w-full max-w-md rounded-lg px-6 py-4 sm:border"
    >
      <FieldSet>
        <FieldGroup>
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="newPassword" className="text-muted-foreground">
              New Password
            </FieldLabel>
            <Input
              {...form.register("password")}
              id="newPassword"
              type="password"
              placeholder="At least 8 characters"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel
              htmlFor="confirmNewPassword"
              className="text-muted-foreground"
            >
              Confirm New Password
            </FieldLabel>
            <Input
              {...form.register("confirmPassword")}
              id="confirmNewPassword"
              type="password"
              placeholder="Repeat the new password"
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            )}
          </Field>

          <Button className={"h-12 w-full"} type="submit">
            Save new password
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ResetPasswordForm;
