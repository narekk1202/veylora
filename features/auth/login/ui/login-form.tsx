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
import Link from "next/link";
import { useLogin } from "../use-login";

const LoginForm = () => {
  const { form, isPending, errors, onSubmit } = useLogin();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="sm:bg-primary-foreground mt-10 min-h-80 w-full max-w-md rounded-lg px-6 py-4 sm:border"
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
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password" className="text-muted-foreground">
              Password
            </FieldLabel>
            <Input
              {...form.register("password")}
              id="password"
              type="password"
              placeholder="********"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          <div className="flex w-full justify-end">
            <Button variant={"link"} className={"text-muted-foreground"}>
              <Link href={"/forgot-password"}>Forgot Password?</Link>
            </Button>
          </div>

          <Button className={"h-12 w-full"} type="submit" disabled={isPending}>
            Sign In
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default LoginForm;
