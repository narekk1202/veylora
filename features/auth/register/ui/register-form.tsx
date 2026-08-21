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
import { useRegister } from "../use-register";

const RegisterForm = () => {
  const { form, errors, onSubmit } = useRegister();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="sm:bg-primary-foreground mt-10 min-h-90 w-full max-w-md rounded-lg px-6 py-4 sm:border"
    >
      <FieldSet>
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name" className="text-muted-foreground">
              Name
            </FieldLabel>
            <Input
              {...form.register("name")}
              id="name"
              type="text"
              placeholder="How we greet you"
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
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
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password" className="text-muted-foreground">
              Password
            </FieldLabel>
            <Input
              {...form.register("password")}
              id="password"
              type="password"
              placeholder="At least 8 characters"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          <Button className={"h-12 w-full"} type="submit">
            Create Account
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default RegisterForm;
